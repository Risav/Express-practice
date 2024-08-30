import express from 'express';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride(function (req, res) {
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        var method = req.body._method
        console.log(method, req.body._method)
        delete req.body._method
        return method
    }
}))

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs');
})

let items = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
];

app.get('/items', (req, res) => {
    res.render('index.ejs', {items});
})

app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
    };
    items.push(newItem);
    res.redirect('/items');
});

app.delete('/deleteitems', (req, res) => {
    const id = parseInt(req.body.id);

    items = items.filter(item => item.id !== id);
    res.redirect('/items');
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});