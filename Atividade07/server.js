require('colors');
var http = require('http');
var express = require('express');
var path = require('path');
var session = require('express-session');

var app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'seuSegredoSuperFofo',
  resave: false,
  saveUninitialized: false
}));

// Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos da raiz do repositório
app.use(express.static(path.join(__dirname, '..')));

// Modelos do MongoDB
const { Post, Usuario, Carro } = require('./db');

// Arrays em memória (LAB 08 e LAB 11)
var usuariosCadastrados = []; // LAB 08 (cadastro/login simples)
let users = [];               // LAB 11 (gerenciador)
let products = [];            // LAB 11

// ====================== ROTAS ======================

// Redirecionamento padrão
app.get('/', (req, res) => res.redirect('/Atividade02/Projects.html'));

// ---------- LAB 08 - Cadastro e Login (prefixo /lab08) ----------
app.get('/lab08/cadastra', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Atividade08', 'Cadastro.html'));
});
app.get('/lab08/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Atividade08', 'Login.html'));
});
app.post('/lab08/cadastra', (req, res) => {
  var { nome, usuario, senha } = req.body;
  usuariosCadastrados.push({ nome, usuario, senha });
  console.log(`Novo cadastro: ${usuario}`.green);
  res.redirect('/lab08/login');
});
app.post('/lab08/login', (req, res) => {
  var { usuario, senha } = req.body;
  var user = usuariosCadastrados.find(u => u.usuario === usuario && u.senha === senha);
  res.render('Atividade07/resposta', {
    status: user ? 'sucesso' : 'erro',
    mensagem: user ? 'Login efetuado com sucesso!' : 'Usuário ou senha inválidos.',
    usuario: user ? user.nome : usuario
  });
});

// ---------- LAB 09 - Blog (prefixo /lab09) ----------
app.get('/lab09/blog', async (req, res) => {
  try {
    const posts = await Post.find().sort({ criado_em: -1 }).lean();
    res.render('Atividade09/blog', { posts });
  } catch (err) {
    console.error('Erro ao buscar posts:'.red, err.message);
    res.status(500).send('Erro no servidor');
  }
});
app.get('/lab09/cadastrar_post', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Atividade09', 'cadastrar_post.html'));
});
app.post('/lab09/cadastrar_post', async (req, res) => {
  const { titulo, resumo, conteudo } = req.body;
  try {
    const novoPost = new Post({ titulo, resumo, conteudo });
    await novoPost.save();
    console.log('Post salvo no MongoDB:'.green, titulo);
    res.redirect('/lab09/blog');
  } catch (err) {
    console.error('Erro ao salvar post:'.red, err.message);
    res.status(500).send('Erro ao cadastrar');
  }
});

// ---------- LAB 10 - Carros (prefixo /lab10) ----------
// Middleware de autenticação para gerência
function verificarLogin(req, res, next) {
  if (req.session && req.session.usuario) return next();
  res.redirect('/lab10/usuarios/login');
}

// Páginas de usuário
app.get('/lab10/usuarios/cadastro', (req, res) => {
  res.render('Atividade10/cadastro_usuario', { erro: null });
});
app.post('/lab10/usuarios/cadastro', async (req, res) => {
  const { nome, login, senha } = req.body;
  try {
    const usuario = new Usuario({ nome, login, senha });
    await usuario.save();
    console.log(`Novo usuário cadastrado: ${login}`.green);
    res.redirect('/lab10/usuarios/login');
  } catch (err) {
    if (err.code === 11000) {
      res.render('Atividade10/cadastro_usuario', { erro: 'Login já existente.' });
    } else {
      console.error('Erro ao cadastrar usuário:'.red, err.message);
      res.status(500).send('Erro no servidor');
    }
  }
});
app.get('/lab10/usuarios/login', (req, res) => {
  res.render('Atividade10/login_usuario', { erro: null });
});
app.post('/lab10/usuarios/login', async (req, res) => {
  const { login, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ login, senha });
    if (usuario) {
      req.session.usuario = usuario;
      res.redirect('/lab10/carros/gerencia');
    } else {
      res.render('Atividade10/login_usuario', { erro: 'Login ou senha inválidos.' });
    }
  } catch (err) {
    console.error('Erro no login:'.red, err.message);
    res.status(500).send('Erro no servidor');
  }
});
app.get('/lab10/usuarios/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/lab10/carros');
});

// Listagem pública e venda
app.get('/lab10/carros', async (req, res) => {
  try {
    const carros = await Carro.find().lean();
    res.render('Atividade10/carros', { carros });
  } catch (err) {
    console.error('Erro ao listar carros:'.red, err.message);
    res.status(500).send('Erro no servidor');
  }
});
app.post('/lab10/carros/vender/:id', async (req, res) => {
  try {
    const carro = await Carro.findById(req.params.id);
    if (!carro) return res.status(404).send('Carro não encontrado');
    if (carro.qtde_disponivel > 0) {
      carro.qtde_disponivel -= 1;
      await carro.save();
    }
    res.redirect('/lab10/carros');
  } catch (err) {
    console.error('Erro ao vender carro:'.red, err.message);
    res.status(500).send('Erro ao processar venda');
  }
});

// Gerência (protegida)
app.get('/lab10/carros/gerencia', verificarLogin, async (req, res) => {
  try {
    const carros = await Carro.find().lean();
    res.render('Atividade10/gerencia', { carros, usuario: req.session.usuario });
  } catch (err) {
    console.error('Erro na gerência:'.red, err.message);
    res.status(500).send('Erro no servidor');
  }
});
app.post('/lab10/carros/gerencia/cadastrar', verificarLogin, async (req, res) => {
  const { marca, modelo, ano, qtde_disponivel } = req.body;
  try {
    const novoCarro = new Carro({ marca, modelo, ano, qtde_disponivel });
    await novoCarro.save();
    console.log('Novo carro cadastrado:'.green, marca, modelo);
    res.redirect('/lab10/carros/gerencia');
  } catch (err) {
    console.error('Erro ao cadastrar carro:'.red, err.message);
    res.status(500).send('Erro ao cadastrar');
  }
});
app.post('/lab10/carros/gerencia/remover/:id', verificarLogin, async (req, res) => {
  try {
    await Carro.findByIdAndDelete(req.params.id);
    console.log('Carro removido.'.red);
    res.redirect('/lab10/carros/gerencia');
  } catch (err) {
    console.error('Erro ao remover carro:'.red, err.message);
    res.status(500).send('Erro ao remover');
  }
});
app.post('/lab10/carros/gerencia/atualizar/:id', verificarLogin, async (req, res) => {
  const { marca, modelo, ano, qtde_disponivel } = req.body;
  try {
    await Carro.findByIdAndUpdate(req.params.id, { marca, modelo, ano, qtde_disponivel });
    console.log('Carro atualizado.'.green);
    res.redirect('/lab10/carros/gerencia');
  } catch (err) {
    console.error('Erro ao atualizar carro:'.red, err.message);
    res.status(500).send('Erro ao atualizar');
  }
});

// ---------- LAB 11 - Gerenciador (prefixo /lab11) ----------
app.get('/lab11', (req, res) => {
  res.render('Atividade11/index', {
    userCount: users.length,
    productCount: products.length,
    maxUsers: 10,
    maxProducts: 10,
  });
});

// Usuários
app.get('/lab11/usuarios/cadastrar', (req, res) => {
  res.render('Atividade11/users-register', {
    error: null,
    name: '',
    email: '',
    count: users.length,
    max: 10,
  });
});
app.post('/lab11/usuarios/cadastrar', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.render('Atividade11/users-register', {
      error: '❌ Nome e e-mail são obrigatórios!',
      name, email, count: users.length, max: 10,
    });
  }
  if (users.length >= 10) {
    return res.render('Atividade11/users-register', {
      error: '❌ Limite de 10 usuários atingido!',
      name, email, count: users.length, max: 10,
    });
  }
  if (users.some(u => u.email === email.trim())) {
    return res.render('Atividade11/users-register', {
      error: '❌ Este e-mail já está cadastrado!',
      name, email, count: users.length, max: 10,
    });
  }
  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    registeredAt: new Date().toLocaleString('pt-BR'),
  };
  users.push(newUser);
  console.log(`✅ Usuário cadastrado: ${newUser.name}`.green);
  res.redirect('/lab11/usuarios?success=user_added');
});
app.get('/lab11/usuarios', (req, res) => {
  const success = req.query.success === 'user_added';
  res.render('Atividade11/users-list', {
    users, count: users.length, max: 10, showSuccess: success,
  });
});

// Produtos
app.get('/lab11/produtos/cadastrar', (req, res) => {
  res.render('Atividade11/products-register', {
    error: null, name: '', price: '', description: '', count: products.length, max: 10,
  });
});
app.post('/lab11/produtos/cadastrar', (req, res) => {
  let { name, price, description } = req.body;
  if (!name || !price) {
    return res.render('Atividade11/products-register', {
      error: '❌ Nome e preço são obrigatórios!',
      name, price, description, count: products.length, max: 10,
    });
  }
  const priceNum = parseFloat(price);
  if (isNaN(priceNum) || priceNum < 0) {
    return res.render('Atividade11/products-register', {
      error: '❌ Preço deve ser um número positivo!',
      name, price, description, count: products.length, max: 10,
    });
  }
  if (products.length >= 10) {
    return res.render('Atividade11/products-register', {
      error: '❌ Limite de 10 produtos atingido!',
      name, price, description, count: products.length, max: 10,
    });
  }
  const newProduct = {
    id: Date.now(),
    name: name.trim(),
    price: priceNum,
    description: description ? description.trim() : '',
    createdAt: new Date().toLocaleString('pt-BR'),
  };
  products.push(newProduct);
  console.log(`💰 Produto cadastrado: ${newProduct.name}`.green);
  res.redirect('/lab11/produtos?success=product_added');
});
app.get('/lab11/produtos', (req, res) => {
  const success = req.query.success === 'product_added';
  res.render('Atividade11/products-list', {
    products, count: products.length, max: 10, showSuccess: success,
  });
});

// 404 específico do LAB 11
app.use('/lab11', (req, res) => {
  res.status(404).render('Atividade11/404');
});

// 404 geral (opcional)
app.use((req, res) => {
  res.status(404).send('Página não encontrada');
});

// ====================== SERVIDOR ======================
var server = http.createServer(app);
server.listen(80, '0.0.0.0', () => {
  console.log("servidor rodando...".rainbow);
});