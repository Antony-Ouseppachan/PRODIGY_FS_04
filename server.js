const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql');
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require("cors");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Antony@1010',
  database: 'blabber_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

app.use(session({
  secret: '7d60ae7c71fc2d55aad8ce32b515a767a3485b35bc8c2b9eb1e36a4355a558a52f635d5f9bec200d0b66155ea0c1d6712f23b162284885ea533828509d811a70',  // Secret for session encryption
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let users = {};

app.get('/', (req, res) => {
    res.redirect('/login');
  });
  
// Serve login page
app.get('/login', (req, res) => {
    const error = req.flash('error');
    const message = req.flash('message');
    res.render('login', { error, message });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err || results.length === 0) {
            req.flash('error', 'Invalid username or password');
            return res.redirect('/login');
        }

        const user = results[0];

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            req.flash('error', 'Invalid username or password');
            return res.redirect('/login');
        }

        req.session.user = user;
        res.redirect('/chat');
    });
});

// Serve registration page
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) {
          req.flash('error', 'Username already exists');
          return res.redirect('/login');
        }
        req.flash('message', 'Registration successful!');
        res.redirect('/login');
      });
    } catch (error) {
      console.error(error);
      req.flash('error', 'Registration failed. Please try again.');
      res.redirect('/register');
    }
  });
  
// Serve chat room page
app.get('/chat', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
  
    db.query(`
      SELECT messages.sender_id, messages.message, messages.timestamp, users.username
      FROM messages
      INNER JOIN users ON messages.sender_id = users.id
      ORDER BY messages.timestamp ASC
    `, (err, messages) => {
      if (err) throw err;

      messages = messages.map(msg => {
        const timestamp = new Date(msg.timestamp);
        const formattedTimestamp = timestamp.toISOString().slice(0, 19).replace("T", " ");
        msg.timestamp = formattedTimestamp;
        return msg;
      });
  
      res.render('chat', { user: req.session.user, messages });
    });
  });
  

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/chat');
        }
        res.redirect('/');
    });
});

// WebSocket communication via Socket.IO
io.on('connection', (socket) => {
    let currentUser = null;

    socket.on('join', (userId) => {
        currentUser = userId;
        users[userId] = socket.id;
    });

    socket.on('sendMessage', (data) => {
        io.emit('receiveMessage', data);

        db.query(
            'INSERT INTO messages (sender_id, message, timestamp) VALUES (?, ?, ?)',
            [currentUser, data.message, data.timestamp],
            (err) => {
                if (err) throw err;
            }
        );
    });

    socket.on('disconnect', () => {
        if (currentUser) {
            delete users[currentUser];
        }
    });
});
  
const port = 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
