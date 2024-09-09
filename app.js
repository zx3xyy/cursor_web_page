const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('layout', {
        title: 'Home',
        content: res.render('index', { title: 'Home' })
    });
});

app.get('/about', (req, res) => {
    res.render('layout', {
        title: 'About',
        content: res.render('about', { title: 'About' })
    });
});

app.get('/articles', (req, res) => {
    const articles = [
        { title: 'My First Article', content: 'This is the content of my first article.' },
        { title: 'Another Great Post', content: 'Here\'s another interesting article.' }
    ];
    res.render('layout', {
        title: 'Articles',
        content: res.render('articles', { title: 'Articles', articles: articles })
    });
});

// Middleware to log visitor information
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`Visitor from: ${ip}`);
    next();
});

app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});
