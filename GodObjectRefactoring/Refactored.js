'use strict';

const http = require('http');
const fs = require('fs');

// Refactored antipattern: Large Class or God Object

class Parser {
  parseCookies(cookie) {
    const cookies = {};
    if (cookie)
      cookie.split(';').forEach((item) => {
        const parts = item.split('=');
        cookies[parts[0].trim()] = (parts[1] || '').trim();
      });
    return cookies;
  }
}

class Logger {
  log(line) {
    const date = new Date().toISOString();
    console.log(date + ' ' + line);
  }
}

class ServerTemplate {
  constructor(parser, logger) {
    this.cache = {};
    this.parser = parser;
    this.logger = logger;
    this.server = http.createServer((req, res) => {
      this.req = req;
      this.res = res;
      this.handler();
    });
  }

  serveFromCache() {
    if (this.cache[this.req.url] && this.req.method === 'GET') {
      this.logger.log(`Cache used for GET ${this.req.url}`);
      this.res.writeHead(200);
      this.res.end(this.cache[this.req.url]);
      return true;
    }
    return false;
  }

  handler() {
    throw new Error('Not implemented');
  }

  listen(port) {
    this.server.listen(port);
  }
}

class PersonController extends ServerTemplate {
  constructor(parser, logger) {
    super(parser, logger);
  }

  getRoot(cookies) {
    this.res.writeHead(200, {
      'Set-Cookie': 'mycookie=test',
      'Content-Type': 'text/html',
    });
    const ip = this.req.connection.remoteAddress;
    this.res.write(`<h1>Welcome</h1>Your IP: ${ip}`);
    this.res.end(`<pre>${JSON.stringify(cookies)}</pre>`);
  }

  getPerson() {
    fs.readFile('./person.json', (err, data) => {
      if (!err) {
        const obj = JSON.parse(data);
        obj.birth = new Date(obj.birth);
        const difference = new Date() - obj.birth;
        obj.age = Math.floor(difference / 31536000000);
        delete obj.birth;
        const sobj = JSON.stringify(obj);
        this.cache[this.req.url] = sobj;
        // HTTP reply
        this.res.writeHead(200);
        this.res.end(sobj);
      } else {
        this.res.writeHead(500);
        this.res.end('Read error');
      }
    });
  }

  postPerson() {
    const body = [];
    this.req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        let data = Buffer.concat(body).toString();
        const obj = JSON.parse(data);
        if (obj.name) obj.name = obj.name.trim();
        data = JSON.stringify(obj);
        this.cache[this.req.url] = data;
        fs.writeFile('./person.json', data, (err) => {
          if (!err) {
            this.res.writeHead(200);
            this.res.end('File saved');
          } else {
            this.res.writeHead(500);
            this.res.end('Write error');
          }
        });
      });
  }

  routing(cookies) {
    const router = {
      '/': () => {
        if (this.req.method === 'GET') {
          this.getRoot(cookies);
        }
      },
      '/person': () => {
        if (this.req.method === 'GET') {
          this.getPerson();
        } else if (this.req.method === 'POST') {
          this.postPerson();
        }
      },
      default: () => {
        this.res.writeHead(404);
        this.res.end('Path not found');
      },
    };

    router[this.req.url]?.() || router.default();
  }

  handler() {
    const cookies = this.parser.parseCookies(this.req.headers.cookie);
    this.logger.log(`${this.req.method} ${this.req.url}`);
    if (!this.serveFromCache()) {
      this.routing(cookies);
    }
  }
}

// Usage

const controller = new PersonController(new Parser(), new Logger());
controller.listen(8000);
