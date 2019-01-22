const { db } = require('./models');

db.sync({ force: true })
  .then(() => {
    console.log('database is running');
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    db.close();
  });
