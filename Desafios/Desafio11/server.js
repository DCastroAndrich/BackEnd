/* MODULOS */
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const exhbs = require("express-handlebars");
const path = require("path");


const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const ProductsMock = require("./src/mocks/ProductsMocks.js");
const Container = require("./src/containers/Container");
const { optionsMySQL } = require("./src/utils/optionsMySQL");
const { optionsSQLite } = require("./src/utils/optionsSQLite.js");

const tableProducts = "products";
const tableMessages = "messages";

const mockItems = new ProductsMock();

const connectMongo = require("connect-mongo");

const MongoStore = connectMongo.create({
  mongoUrl:
    "mongodb+srv://damian:damian@clusterex11.xtyhv.mongodb.net/Desafio11?retryWrites=true&w=majority",
  ttl: 60,
});

/* INSTANCIACION */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const apiProducts = new Container(optionsMySQL, tableProducts);
const apiMessages = new Container(optionsSQLite, tableMessages);

/* MIDDLEWARES */
app.use(cookieParser())
app.use(
  session({
    store: MongoStore,
    secret: "123456789!#$%&/",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000}
  })
);

app.set("views", path.join(__dirname, "./src/views"));

app.engine(
  "hbs",
  exhbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialDir: path.join(app.get("views"), "partials"),
    extname: "hbs",
  })
);

app.set("view engine", "hbs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ROUTES */
app.get("/api/productos-test", (req, res) => {
  res.json(mockItems.random());
});

/* pruebas */
app.get("/", (req, res) => {
  const nombre = req.session.nombre
  console.log(nombre);
  res.render('home', nombre);
});

app.get("/login", (req, res) => {
  res.render("login");
});


app.post('/login', (req, res)=>{
  const {nombre} = req.body
  req.session.nombre = nombre

  console.log(nombre);
  res.redirect('/')
})


app.get("/logout", (req, res) => {
  const {nombre} = req.body
  req.session.nombre = nombre
  
  req.session.destroy((err) => {
    if (!err) res.render("logout", nombre);
    else res.send({ status: "Error al desloguear", body: err });
  });
});

/* WEBSOCKET */
io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);
  //------- Enviar histórico de productos
  socket.emit("products", await apiProducts.listAll());

  //------- Escuchar nuevos productos
  socket.on("newProduct", async (product) => {
    await apiProducts.save(product);

    //Actualización de la vista de productos
    io.sockets.emit("products", await apiProducts.listAll());
  });

  //------- Enviar histórico de mensajes
  socket.emit("messages", await apiMessages.listAll());

  //------- Escuchar nuevos mensajes
  socket.on("newMessage", async (msg) => {
    msg.date = new Date().toLocaleString();
    await apiMessages.save(msg);

    //Actualización de la vista de mensajes
    io.sockets.emit("messages", await apiMessages.listAll());
  });
});

/* SERVIDOR */
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchado en puerto ${server.address().port}`);
});
server.on("error", (error) => console.error(`Error en servidor ${error}`));
