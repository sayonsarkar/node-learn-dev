const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');

const app = express();

//ejs
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));

app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log('New request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
})

app.use((req, res, next) => {
    console.log('In the next middleware');
    next();
}
);

app.get('/', (req, res) => {
    // res.send('Hello World!');
    // res.sendFile('./views/index.html', {root: __dirname});
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index.ejs', {title: 'Home', blogs});
}
);

app.get('/about', (req, res) => {
    // res.send('About page');
    // res.sendFile('./views/about.html', {root: __dirname});
    res.render('about.ejs', {title: 'About'});
}
);

app.get('/blogs/create', (req, res) => {
    res.render('create.ejs', {title: 'Create a new blog'});
}
);

//redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// }
// );

//404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.ejs', {root: __dirname});
}
);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
}
);