const express = require('express');
const bodyParser = require('body-parser');
const ARIABebe = require('./src/ARIA_Bebe.js');

const app = express();
const aria = new ARIABebe();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/chat', (req, res) => {
  const { mensaje } = req.body;

  if (!mensaje) {
    return res.status(400).json({ error: 'El campo "mensaje" es requerido.' });
  }

  const respuesta = aria.responder_maestro(mensaje);
  const estado = aria.obtener_estado();

  return res.json({ respuesta, estado });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ARIA escuchando en el puerto ${PORT}`);
});

module.exports = app;
