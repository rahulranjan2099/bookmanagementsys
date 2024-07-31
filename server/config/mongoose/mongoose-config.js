module.exports = {
  mongodb: {
    url: 'mongodb://localhost:27017/BookManagementSystem',
    databaseName: 'BookManagementSystem',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationsPath: './migrations',
  collectionName: 'migrations'
};