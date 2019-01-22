const { db, Gardener, Plot, Vegetable } = require('./models');

const vegetables = [
  { name: 'Tomato' },
  { name: 'Carrot' },
  { name: 'Potato' },
  { name: 'Onion' },
];
const gardener = [
  { name: 'Zach', age: 23 },
  { name: 'Jake', age: 36 },
  { name: 'Jim', age: 30 },
];
const plot = [
  { size: 5, shaded: true },
  { size: 3, shaded: false },
  { size: 10, shaded: false },
];

db.sync({ force: true })
  .then(() => {
    const vegetablePromise = Vegetable.bulkCreate(vegetables, {
      returning: true,
    });
    const gardenerPromise = Gardener.bulkCreate(gardener, { returning: true });
    const plotPromise = Plot.bulkCreate(plot, { returning: true });

    return Promise.all([vegetablePromise, gardenerPromise, plotPromise]);
  })
  .then(dbValues => {
    const [vegies, gardeners, plots] = dbValues;
    const [tomato, carrot, potato, onion] = vegies;
    const [Zach, Jake, Jim] = gardeners;
    const [medium, small, large] = plots;

    const promise1 = Zach.setPlot(large);
    const promise2 = Jake.setPlot(medium);

    console.log(Gardener.__proto__);
    // const promise3 = Zach.setVegetable(tomato);

    return Promise.all([promise1, promise2]);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    db.close();
  });
