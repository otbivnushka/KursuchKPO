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

      let nl;
      while ((nl = this.buffer.indexOf('\n')) !== -1) {
        // вырезаем строку
        const raw = this.buffer.slice(0, nl).trim();
        this.buffer = this.buffer.slice(nl + 1);

        if (!raw) continue;

        let parsed;
        try {
          parsed = JSON.parse(raw);
        } catch (e) {
          console.error('Bad JSON from server:', raw);
          continue;
        }

        if (this.messageQueue.length > 0) {
          const callback = this.messageQueue.shift();
          callback(parsed);
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

  // отправка JSON
  sendJson(obj) {
    if (!this.client) throw new Error('Client not connected');
    const str = JSON.stringify(obj);
    this.client.write(str + '\n'); // newline — конец сообщения
  }

  // ждём ОДИН ответ
  onceMessage(callback) {
    this.messageQueue.push(callback);
  }

  disconnect() {
    if (this.client) this.client.end();
  }
}

module.exports = { Client };
