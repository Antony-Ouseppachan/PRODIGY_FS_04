---

# Blabber Chat 💬

Blabber Chat is a **real-time web chat application** built using **Node.js**, **Express**, **Socket.IO**, **EJS**, and **MySQL**.  
It allows multiple users to join, chat in real time, and view previous message history.

---

## 🚀 Features

- 🧑‍🤝‍🧑 Real-time chat updates using **Socket.IO**
- 📜 Display of **chat history** stored in a **MySQL database**
- ✉️ Send and receive live messages instantly
- 👤 User login and logout functionality
- ⏳ Real-time clock display
- 📜 Auto-scroll to latest chat feature
- 🎨 Clean and modern UI with custom CSS
- 🔐 Secure logout

---

## 🛠️ Built With

- **Node.js** — Backend JavaScript runtime
- **Express.js** — Web application framework
- **EJS** — Embedded JavaScript templating
- **Socket.IO** — Real-time bi-directional event-based communication
- **MySQL** — Database to store messages and user data
- **HTML5 / CSS3** — Frontend UI design
- **Font Awesome** — Icons

---

## 📂 Project Structure

```
blabber-chat/
├── public/
│   ├── css/
│   │   └── chat.css
│   ├── media/
│   │   └── logo.png
│   └── socket.io/ (served automatically by socket.io)
├── views/
│   ├── chat.ejs
│   └── login.ejs
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/blabber-chat.git
cd blabber-chat
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure MySQL Database

- Create a database (e.g., `blabber_db`).
- Create a `messages` table:
```sql
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
- (Optional) Create a `users` table if you manage logins.

### 4. Configure Database Connection

In your `server.js` (or a separate config file), set your MySQL credentials:
```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'blabber_db'
});
```

### 5. Run the Server
```bash
node server.js
```

Server will start running at:
```
http://localhost:3000
```

---

## 🎥 Demo

> _Insert screenshots or screen recording GIF here!_  
> Example:
> ![Blabber Chat Demo](path-to-demo.gif)

---

## 💡 Future Improvements

- Private messaging (DMs)
- Typing indicators ("User is typing...")
- Emojis and GIF support
- Notification badges
- Admin panel to moderate chats

---

## 🙌 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Contact

- GitHub: [your-username](https://github.com/Antony-Ouseppachan)

---

# 🔥 Let's Blabber! 🔥

---

---
