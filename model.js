const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/plantr', { logging: false })



const Gardener = db.define('gardener', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

const Vegetable = db.define('vegetable', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  planted_on: {
    type: Sequelize.DATE,
    allowNull: false,
  }
});

const Plot = db.define('plot', {
  size: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  shaded: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});

Plot.belongsTo(Gardener)
Vegetable.belongsToMany(Plot, {through: 'PlotVegetable'})
Plot.belongsToMany(Vegetable, {through: 'PlotVegetable'})

const insertRows = () => {

  let veg1 =  Vegetable.create({
    name: "cactus",
    color: "green",
    planted_on: '2016-08-09',
  });

  let veg2 = Vegetable.create({
    name: "onion",
    color: "red",
    planted_on: '2018-08-09',
  });

  return Promise.all([veg1, veg2]);
}

// let veg1 =  Vegetable.create({
//   name: "cactus",
//   color: "green",
//   planted_on: '2016-08-09',
// });

module.exports = {
  db,
  insertRows
}
