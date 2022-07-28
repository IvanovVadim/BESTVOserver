const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});
 // Логируем метод, статус, длинну контента и время ответа в МС
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

// Разблокируем статические файлы(в данном примере стиль)

app.use(express.static('styles'));

app.get('/', (req, res) =>{
    const title = 'Home';
    const index = [
        { name: 'AllStartPage', link: 'https://wiki.tcsbank.ru/pages/viewpage.action?pageId=1139086259' },
    ];
    res.render(createPath('index'), { index, title });
});

app.get('/contacts', (req, res) =>{
    const title = 'Contacts';
    const contacts = [
        { name: 'OurPage', link: 'https://wiki.tcsbank.ru/pages/viewpage.action?pageId=1326017642' },
        { name: 'DeveloperPage', link: 'https://wiki.tcsbank.ru/pages/viewpage.action?pageId=1471837093' },
    ];
    res.render(createPath('contacts'), { contacts, title });
});

app.post('/add-post', (req, res) => {
    const { title, author, text } = req.body;
    const post = {
        id: new Date(),
        date: (new Date()).toLocaleDateString(),
        title,
        author,
        text,
    };
    res.render(createPath('post'), { post, title });
});

app.get('/add-post', (req, res) =>{
    const title = 'add-post';
    res.render(createPath('add-post'), { title });
});

app.get('/posts/:id', (req, res) =>{
    const title = 'Post';
    const post = {
        id: '1',
        text: 'My 1st post',
        title: 'Post title',
        date: '28.07.2022',
        auhhor: 'Vadim',
    };
    res.render(createPath('post'), { title, post });
});

app.get('/posts', (req, res) =>{
    const title = 'Posts';
    const posts = [
    {   
        id: '1',
        text: 'My 1st post',
        title: 'Post title',
        date: '28.07.2022',
        auhhor: 'Vadim', 
    }       
    ]
    res.render(createPath('posts'), { title, posts });
});

app.get('/about-us', (req, res) =>{
    res.redirect('/contacts');
});

app.use((req, res) =>{
    const title = 'Error';
    res
    .status(404)
    .render(createPath('error'), { title });
});
