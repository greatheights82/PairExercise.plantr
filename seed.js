const { db, Gardener, Plot, Vegetable } = require('./models');

const vegetables = [{name: 'Tomato'}, {name: 'Carrot'}, {name: 'Potato'}, {name: 'Onion'}]
const gardener = [{name: 'Zach', age: 23}, {name: 'Jake', age: 36}, {name: 'Jim', age: 30}]
const plot = [];


db.sync({ force: true })
  .then(() => {
    const vegetablePromise = Vegetable.bulkCreate(vegetables, {returning: true});
    const gardenerPromise = Gardener.bulkCreate(gardener, {returning: true})
    return Promise.all([vegetablePromise, gardenerPromise])
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    db.close();
  });
