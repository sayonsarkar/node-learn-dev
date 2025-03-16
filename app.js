const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const mongoDBURl = 'mongodb+srv://shayondev:1234@cluster0.qdn9n.mongodb.net/node-tuts?retryWrites=true&w=majority';

mongoose.connect(mongoDBURl)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//ejs
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

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

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'    
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }
// );

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }
// );

// app.get('/single-blog', (req, res) => {
//     Blog.findById('67d5d04199907bd5c938d015')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }
// );

app.get('/', (req, res) => {
    // res.send('Hello World!');
    // res.sendFile('./views/index.html', {root: __dirname});
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    // res.render('index.ejs', {title: 'Home', blogs});
    res.redirect('/blogs');
}
);

app.get('/about', (req, res) => {
    // res.send('About page');
    // res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title: 'About'});
}
);

//blog routes
app.use('/blogs', blogRoutes);

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

// app.listen(3000, () => {
//     console.log('Server is listening on port 3000');
// }
// );