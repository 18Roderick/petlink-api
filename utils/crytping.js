const crypto = require('crypto');
const CRYPTO_ALGORITHM = process.env.CRYPTO_ALGORITHM || 'aes-192-cbc';
const CRYPTO_SECRET_KEY =
	process.env.CRYPTO_SECRET_KEY || 'fuiniuhu28r7hg7g85d-d34r92#';
const SALT =
	process.env.CRYPTO_SALT || 'saltfmwofnwoifnoi9r823j98rh98rh2er24rf';
const BITS = 24;

const Crypting = {
	getIv: () => Buffer.alloc(16, 0),
	getKey: () => crypto.scryptSync(CRYPTO_SECRET_KEY, SALT, BITS),
	async encrypt(text) {
		try {
			const cipher = crypto.createCipheriv(
				CRYPTO_ALGORITHM,
				this.getKey(),
				this.getIv()
			);
			let encrypted = cipher.update(text, 'utf8', 'hex');
			encrypted += cipher.final('hex');
			return encrypted;
		} catch (error) {
			throw error;
		}
	},
	async compare(text1, text2) {
		try {
			return (await this.encrypt(text1)) === (await this.encrypt(text2));
		} catch (error) {
			throw error;
		}
	},
	async decrypt(text) {
		try {
			const decipher = crypto.createDecipheriv(
				CRYPTO_ALGORITHM,
				this.getKey(),
				this.getIv()
			);
			let decrypted = decipher.update(text, 'hex', 'utf8');
			decrypted += decipher.final('utf8');
			return decrypted;
		} catch (error) {
			throw error;
		}
	},
};

module.exports = Crypting;
