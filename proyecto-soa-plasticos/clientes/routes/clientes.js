const express = require('express');
const router  = express.Router();
const Cliente = require('../models/Cliente');

// GET /clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json({ success: true, data: clientes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /clientes/:id
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
    res.json({ success: true, data: cliente });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /clientes
router.post('/', async (req, res) => {
  try {
    const { nombre, empresa, telefono, correo } = req.body;
    if (!nombre)
      return res.status(400).json({ success: false, message: 'El campo nombre es requerido' });

    const cliente = await Cliente.create({ nombre, empresa, telefono, correo });
    res.status(201).json({ success: true, data: cliente });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
