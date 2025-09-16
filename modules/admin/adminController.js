const adminService = require('./adminService');

exports.addPizza = (req, res) => {
  const newPizza = adminService.addPizza(req.body);
  res.status(201).json(newPizza);
};

exports.updatePizza = (req, res) => {
  const updated = adminService.updatePizza(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: "Pizza not found" });
  }
  res.json(updated);
};

exports.deletePizza = (req, res) => {
  const deleted = adminService.deletePizza(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: "Pizza not found" });
  }
  res.json({ message: "Pizza deleted successfully" });
};
