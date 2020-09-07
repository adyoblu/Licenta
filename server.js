const jsonServer = require('json-server'),
    app = jsonServer.create(),
    router = jsonServer.router('db.json'),
    middlewares = jsonServer.defaults();

var port = process.env.PORT || 3000;
app.use(middlewares);
app.use(router);
app.set('view engine', 'ejs'); 

app.listen(port, function(){
    console.log('GULP ruleaza pe portul: ', port);
})