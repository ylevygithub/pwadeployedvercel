const fs = require('fs');
const https = require('https');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/users');

const app = express();
const corsOptions = {
  origin: 'https://pwadeployedvercel.vercel.app', // Remplacez par l'URL de votre frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};


// Middleware
app.options('*', cors(corsOptions)); // Autorise toutes les requêtes préflight
app.use(cors(corsOptions));
app.use(express.json());

// Redirection HTTP -> HTTPS (facultatif)
// app.use((req, res, next) => {
//   if (req.protocol === 'http') {
//     return res.redirect(301, `https://${req.headers.host}${req.url}`);
//   }
//   next();
// });

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Body:`, req.body);
  next();
});

// Connect to MongoDB (ne changez rien ici si ça fonctionnait avant)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Stop server if MongoDB fails
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// HTTPS Configuration
const sslOptions = {
  key: fs.readFileSync('../selfsigned.key'), 
  cert: fs.readFileSync('../selfsigned.crt') 
};

// Démarrer le serveur HTTPS
const PORT = process.env.PORT || 5001;

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});

// Facultatif : Démarrer un serveur HTTP (pour redirection ou tests)
// const PORT_HTTP = process.env.PORT_HTTP || 5001;
// app.listen(PORT_HTTP, () => {
//   console.log(`HTTP Server running on port ${PORT_HTTP}`);
// });
