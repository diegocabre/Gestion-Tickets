const express = require("express");
const { Pool } = require("pg");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const path = require("path");
const addUserToLocals = require("./middlewares/addUserToLocals");
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
    helpers: {
      ifCond: function (v1, operator, v2, options) {
        switch (operator) {
          case "==":
            return v1 == v2 ? options.fn(this) : options.inverse(this);
          case "===":
            return v1 === v2 ? options.fn(this) : options.inverse(this);
          case "!=":
            return v1 != v2 ? options.fn(this) : options.inverse(this);
          case "!==":
            return v1 !== v2 ? options.fn(this) : options.inverse(this);
          case "<":
            return v1 < v2 ? options.fn(this) : options.inverse(this);
          case "<=":
            return v1 <= v2 ? options.fn(this) : options.inverse(this);
          case ">":
            return v1 > v2 ? options.fn(this) : options.inverse(this);
          case ">=":
            return v1 >= v2 ? options.fn(this) : options.inverse(this);
          default:
            return options.inverse(this);
        }
      },
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "../client")));

// Middleware para agregar usuario a res.locals
app.use(addUserToLocals);

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
