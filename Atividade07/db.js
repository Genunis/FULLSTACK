const mongoose = require('mongoose');

const uri = 'mongodb+srv://jeniffernicolly9_db_user:jn78133@blogdb.rmjo4et.mongodb.net/blogdb?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => console.log('Conectado ao MongoDB Atlas!'.green))
  .catch(err => console.error('Erro na conexão:'.red, err.message));

// Modelo de Post (já existente)
const postSchema = new mongoose.Schema({
  titulo:   { type: String, required: true },
  resumo:   { type: String, default: '' },
  conteudo: { type: String, required: true },
  criado_em: { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', postSchema);

// Modelo de Usuário (para o sistema de carros)
const usuarioSchema = new mongoose.Schema({
  nome:  { type: String, required: true },
  login: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Modelo de Carro
const carroSchema = new mongoose.Schema({
  marca:          { type: String, required: true },
  modelo:         { type: String, required: true },
  ano:            { type: Number, required: true },
  qtde_disponivel: { type: Number, default: 0 }
});
const Carro = mongoose.model('Carro', carroSchema);

module.exports = { Post, Usuario, Carro };