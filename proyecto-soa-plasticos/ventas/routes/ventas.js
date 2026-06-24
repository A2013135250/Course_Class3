const express = require('express');
const router  = express.Router();
const Venta   = require('../models/Venta');

// GET /ventas
router.get('/', async (req, res) => {
  try {
    const ventas = await Venta.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: ventas });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /ventas/:id
router.get('/:id', async (req, res) => {
  try {
    const venta = await Venta.findByPk(req.params.id);
    if (!venta) return res.status(404).json({ success: false, message: 'Venta no encontrada' });
    res.json({ success: true, data: venta });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /ventas
// Nota: la validación de cliente/producto/stock se hace en el ESB (routes.xml)
// Este servicio solo persiste la venta ya validada.
router.post('/', async (req, res) => {
  try {
    const { cliente_id, producto_id, cantidad, total } = req.body;
    if (!cliente_id || !producto_id || !cantidad || total === undefined)
      return res.status(400).json({
        success: false,
        message: 'Campos requeridos: cliente_id, producto_id, cantidad, total',
      });

    const venta = await Venta.create({ cliente_id, producto_id, cantidad, total });
    res.status(201).json({ success: true, data: venta });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
