const express = require("express");
const { Pool } = require("pg");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const path = require("path");
require("dotenv").config();

// Configuración de la conexión a la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Configuración de Handlebars
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "../client")));

// Rutas
const indexRoutes = require("./routes/index");
const { router: authRoutes } = require("./routes/auth");
const ticketRoutes = require("./routes/tickets");

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
