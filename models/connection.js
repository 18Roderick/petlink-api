const mongoose = require('mongoose');

class Connection extends mongoose.Mongoose {
	constructor() {
		super();
		this.connection;
		this.db;
		this.init();
	}

	async init(count = 0) {
		if (count < 5) {
			try {
				let url = '';

				if (process.env.NODE_ENV === 'PRODUCTION') {
					url = process.env.MONGO_ATLAS_URL;
				} else {
					url = process.env.DEV_MONGO_ATLAS_URL;
				}

				this.connection = await this.connect(url, {
					useNewUrlParser: true,
					useCreateIndex: true,
					useUnifiedTopology: true,
				});
				this.db = this.connection;
			} catch (error) {
				console.warn(error);
				console.info('intentando conectar nuevamente...');
				setTimeout(() => this.init((count += 1)), 1000);
			}
		}

		if (count > 4) {
			console.error(
				'no se pudo establecer una conexion exitosa a la base de datos, verifque sus configracion'
			);
		}
	}
}

module.exports.Mongoose = Connection;
module.exports = new Connection();
