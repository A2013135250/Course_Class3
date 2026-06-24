const express   = require('express');
const cors      = require('cors');
const sequelize = require('./config/database');
const clientesRouter = require('./routes/clientes');

const app  = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ service: 'clientes', status: 'ok' }));

app.use('/clientes', clientesRouter);

sequelize.authenticate()
  .then(() => {
    console.log('[Clientes] Conexión a MySQL OK');
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    app.listen(PORT, () => console.log(`[Clientes] Escuchando en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('[Clientes] Error de conexión:', err.message);
    process.exit(1);
  });
