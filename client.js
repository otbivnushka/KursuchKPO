const net = require('net');

class Client {
  constructor(host = '127.0.0.1', port = 5000) {
    this.client = net.createConnection({ host, port }, () => {
      console.log('Connected');
    });

    this.messageQueue = [];
    this.buffer = '';

    this.client.on('data', (data) => {
      this.buffer += data.toString('utf-8');

      let marker = '<END>';
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

    this.client.on('error', (err) => {
      console.error('Error:', err.message);
    });

    this.client.on('end', () => {
      console.log('Connection closed');
    });
  }

  send(message) {
    const buffer = Buffer.from(message, 'utf-8');
    this.client.write(buffer);
  }

  onceMessage(callback) {
    this.messageQueue.push(callback);
  }

  disconnect() {
    this.client.end();
  }
}

module.exports = { Client };
