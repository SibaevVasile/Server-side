const pizzas = require('../pizzas/pizzasService');

exports.addPizza = (pizzaData) => {
  const newPizza = {
    id: pizzas.getAllPizzas().length + 1,
    ...pizzaData
  };
  pizzas._pizzas.push(newPizza);
  return newPizza;
};

exports.updatePizza = (id, pizzaData) => {
  const pizzaIndex = pizzas._pizzas.findIndex(p => p.id === parseInt(id));
  if (pizzaIndex === -1) return null;
  pizzas._pizzas[pizzaIndex] = { ...pizzas._pizzas[pizzaIndex], ...pizzaData };
  return pizzas._pizzas[pizzaIndex];
};

exports.deletePizza = (id) => {
  const pizzaIndex = pizzas._pizzas.findIndex(p => p.id === parseInt(id));
  if (pizzaIndex === -1) return null;
  return pizzas._pizzas.splice(pizzaIndex, 1);
};
