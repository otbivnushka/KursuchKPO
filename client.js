const net = require('net');

class Client {
  constructor(host = '127.0.0.1', port = 5000) {
    this.host = host;
    this.port = port;
    this.client = null;
    this.messageQueue = [];
    this.buffer = '';
  }

  async connect(timeout = 5000) {
    return new Promise((resolve, reject) => {
      this.client = net.createConnection({ host: this.host, port: this.port });

      const timer = setTimeout(() => {
        this.client.destroy();
        reject(new Error('Connection timeout'));
      }, timeout);

      this.client.once('connect', () => {
        clearTimeout(timer);
        console.log('✅ Connected to server');
        this._setupListeners();
        resolve(true);
      });

      this.client.once('error', (err) => {
        clearTimeout(timer);
        reject(new Error('Connection error: ' + err.message));
      });
    });
  }

  _setupListeners() {
    this.client.on('data', (data) => {
      this.buffer += data.toString('utf-8');
      const marker = '<END>';
      let index;

      while ((index = this.buffer.indexOf(marker)) !== -1) {
        const fullMessage = this.buffer.slice(0, index);
        this.buffer = this.buffer.slice(index + marker.length);

        if (this.messageQueue.length > 0) {
          const callback = this.messageQueue.shift();
          callback(fullMessage);
        }
      }
    });

    this.client.on('end', () => {
      console.log('🔌 Connection closed');
    });

    this.client.on('error', (err) => {
      console.error('❌ Socket error:', err.message);
    });
  }

  send(message) {
    if (!this.client) throw new Error('Client not connected');
    this.client.write(Buffer.from(message, 'utf-8'));
  }

  onceMessage(callback) {
    this.messageQueue.push(callback);
  }

  disconnect() {
    if (this.client) this.client.end();
  }
}

module.exports = { Client };
