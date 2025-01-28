// Bratzche v0.1
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/bratzche', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Modelo de usuario
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

// Modelo de publicación
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Post = mongoose.model('Post', postSchema);

// Modelo de comentario
const commentSchema = new mongoose.Schema({
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

const Comment = mongoose.model('Comment', commentSchema);

// Modelo de categoría
const categorySchema = new mongoose.Schema({
  name: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

const Category = mongoose.model('Category', categorySchema);

// Rutas de autenticación
app.post('/api/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({ name: req.body.name, email: req.body.email, password: hashedPassword, role: 'user' });
  await user.save();
  res.json({ message: 'Usuario registrado correctamente' });
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ message
