const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");

const Sequelize = require("sequelize");
const methodOverride = require("method-override");
const session = require('express-session');
const socketio = require('socket.io');


const app = express();

// ROUTES
const tasksRoutes = require("./routes/tasks_routes");
const registrationRoutes = require("./routes/registrations_routes");
const sessionsRoutes = require('./routes/sessions_routes');
const categoriesRoutes = require('./routes/categories_routes');

// MIDDLEWARES
const findUserMiddleware = require('./middlewares/find_user');
const authUser = require('./middlewares/auth_user');

// let db = new sqlite3.Database('proyecto-backend');
// crear tabla
// db.run('CREATE TABLE tasks(id int AUTO_INCREMENT, description varchar(255) )');

// const sequelize = new Sequelize('proyecto-backend',null,null,{
//   dialect:'sqlite',
//   storage:'./proyecto-backend'
// });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.set("view engine", "pug");

app.use(session({
  secret: ['124rregefngjefngjfe', 'wqrfwegfergerfgerf'],
  saveUninitialized: false,
  resave: false
}));
/*
app.post('/pendientes',function (req,res) {
  // limpiar para no exponernos sanitize
  // db.run(`INSERT INTO tasks(description) VALUES('${req.body.description}')`);
  db.run(`INSERT INTO tasks(description) VALUES(?)`, req.body.description);
  res.send("Inserción finalizada");
}) */

app.use(findUserMiddleware);
app.use(authUser);

app.use(tasksRoutes);
app.use(registrationRoutes);
app.use(sessionsRoutes);
app.use(categoriesRoutes);

app.get('/',function (req,res) {
  res.render('home',{user:req.user});
});

let server = app.listen(3000);
let io = socketio(server);

let usersCount = 0;

io.on('connection', function (socket) {
  usersCount++;
  io.emit('count_updated',{count: usersCount} );

  socket.on('new_task',function (data) {
    io.emit('new_task', data);
  })
  socket.on('disconnect', function () {
    usersCount--;
    io.emit('count_updated',{count: usersCount} );
  })

});




const client = require('./realtime/client');

// process.on('SIGINT',function () {
//   console.log('Adios - Atte. El servidor');
//   db.close();
//   process.exit();
// });
