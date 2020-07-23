//this file is the principal controller of the backend -index-
// we need required 'express' for run a server of easy mode
const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const {database} = require('./keys');
const passport = require('passport');
require('./lib/passport');
/* we tell to the server that the if there are port that start run else we run on port 4000 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
/*---------------------------------------------------------------- */
// |CONFIGURACIONES|
app.engine('.hbs', exphbs({
    defaultLayout: 'main', //configuramos el main de nuestra vista |index.html = main.hbs
    layoutsDir: path.join(app.get('views'), 'layouts'), // ubicamos la carpeta de vistas
    partialsDir: path.join(app.get('views'), 'partials'), // y la carpeta partials 
    extname: '.hbs', //configuramos la extencion de nuestras vistas
    helpers: require('./lib/handlebars') //importamos las librerias
}));
/*---------------------------------------------------------------- */
//  minuto 58

/*---------------------------------------------------------------- */

//VARIABLE DE ENTORNO
app.use(session({
    secret: "olster-node",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.set(express.json());
app.use(passport.initialize());
app.use(passport.session());



app.set('view engine', '.hbs');

/*---------------------------------------------------------------- */
/*---------------------------------------------------------------- */
            //              VARIABLES GLOBALES
/*---------------------------------------------------------------- */
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
});
/*---------------------------------------------------------------- */
// |ROUTES|   we import the routes
app.use(require('./routes'));
app.use(require('./routes/authentications'));
app.use('/links', require('./routes/links'));

app.use(express.static(path.join(__dirname, 'public')));
/*---------------------------------------------------------------- */
app.listen(app.get('port'),() =>{
    console.log("server on port", app.get('port'));
});