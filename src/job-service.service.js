const fs = require('node:fs/promises');

class JobService {
  static isJS(name) {
    return name.split('.').pop() === 'js';
  }

  static removeExtension(name) {
    return name.slice(0, -3);
  }

  static async getAll() {
    const names = await fs.readdir('./src/templates');
    return names.filter(this.isJS).map(this.removeExtension);
  }

  static async execute(name, args) {
    // eslint-disable-next-line
    const job = require(`./templates/${name}`);

    if (!job) {
      throw new Error(`Name not valid ${name}`);
    }

    const result = job(...args);
    return result;
  }
}

module.exports = JobService;
