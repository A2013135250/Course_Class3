const express = require('express');
const router  = express.Router();
const Producto = require('../models/Producto');

// GET /productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json({ success: true, data: productos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /productos/:id
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    res.json({ success: true, data: producto });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /productos
router.post('/', async (req, res) => {
  try {
    const { nombre, tipo, precio, stock } = req.body;
    if (!nombre || !tipo || precio === undefined)
      return res.status(400).json({ success: false, message: 'Campos requeridos: nombre, tipo, precio' });

    const producto = await Producto.create({ nombre, tipo, precio, stock: stock || 0 });
    res.status(201).json({ success: true, data: producto });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /productos/:id/stock  — usado por el ESB al confirmar una venta
router.patch('/:id/stock', async (req, res) => {
  try {
    const { cantidad } = req.body;
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    if (producto.stock < cantidad)
      return res.status(409).json({ success: false, message: 'Stock insuficiente' });

    producto.stock -= cantidad;
    await producto.save();
    res.json({ success: true, data: producto });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
