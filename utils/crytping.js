const bycript = require('bcrypt');

const SALT = 5;

const Crypting = {
  async encrypt(text) {
    const salt = await bycript.genSalt(SALT);
    return bycript.hash(text, salt);
  },
  async compare(text, text2) {
    return bycript.compare(text, text2);
  }
};

module.exports = Crypting;
