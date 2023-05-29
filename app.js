const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
  { id: 1, name: 'Usuario 1' },
  { id: 2, name: 'Usuario 2' },
  { id: 3, name: 'Usuario 3' }
];

// Obtener una lista de usuarios
app.get('/users', (req, res) => {
  res.json(users);
});

// Obtener los detalles de un usuario
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (!user) {
    res.status(404).json({ error: 'Usuario no encontrado' });
  } else {
    res.json(user);
  }
});

// Crear un nuevo usuario
app.post('/users', (req, res) => {
  const newUser = req.body;

  // Validación de datos de entrada
  if (!newUser.name) {
    res.status(400).json({ error: 'El nombre de usuario es obligatorio' });
  } else {
    users.push(newUser);
    res.status(201).json(users);
  }
});

// Actualizar los datos de un usuario
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ error: 'Usuario no encontrado' });
  } else {
    // Validación de datos de entrada
    if (!req.body.name) {
      res.status(400).json({ error: 'El nombre de usuario es obligatorio' });
    } else {
      users[userIndex] = { ...users[userIndex], ...req.body };
      res.json(users);
    }
  }
});

// Eliminar un usuario
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const filteredUsers = users.filter(user => user.id !== userId);

  if (filteredUsers.length === users.length) {
    res.status(404).json({ error: 'Usuario no encontrado' });
  } else {
    users = filteredUsers;
    res.status(204).end();
  }
});

// Manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
