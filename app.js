const express = require('express');
const todoscontroller = require('./Controllers/todoscontroller');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

todoscontroller(app);

app.listen(5000);
console.log('you are listening to port 78s42');
