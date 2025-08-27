const express = require('express');
const router = express.Router();

// Simulação de usuário
const USER = { username: 'admin', password: '123456' };

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    return res.status(200).json({ message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
