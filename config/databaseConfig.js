module.exports = {
  url: (password, db) => `mongodb+srv://admin:${password}@petlink-0mhiv.mongodb.net/${db}?retryWrites=true&w=majority`,
  username: 'root',
  password: 'Tecnologica2018',
  database: 'petlink',
  host: '127.0.0.1',
  port: '27017'
};
