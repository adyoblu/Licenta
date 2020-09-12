var jsonServer = require('json-server'),
    app = jsonServer.create(),
    router = jsonServer.router('db.json');
    
var middlewares = jsonServer.defaults();
var port = process.env.PORT || 3000;

// var cons = require('consolidate'),
//     path = require('path'),
//     bodyParser = require("body-parser"),
//     express = require('express'),
//     flash = require('connect-flash');



// app.get('/', function(req,res,next){ 
//     res.render('index.html');
// });



// app.use(require("express-session")({
//     secret: "Shome",
//     resave: false,
//     saveUninitialized: false
// }));

//     app.set('views', path.join(__dirname, 'views'));
//     app.engine('html', cons.swig);
//     app.set('view engine', 'html');
//     app.use(bodyParser.urlencoded({extended: true}));
//     app.use(router);
//     app.use(middlewares);
//     app.use(express.static(__dirname + "/public"));
//     app.use('public/javascripts', express.static(path.join(__dirname, 'public/scripts')));
//     app.use('public/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));
//     app.use(flash());


app.use(middlewares);
app.use(router);

app.listen(port, function(){
    console.log('GULP ruleaza pe portul: ', port);
})