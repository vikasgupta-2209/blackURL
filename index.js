const express = require("express");
const app = express();
const port = 8000;

const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/shorturlDB")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("DB connection error:", err));

// Routers
const shortUrlRouter = require("./router/shortUrlRoutes");
const staticRouter = require("./router/staticRouter");
const authRouter = require("./router/userAuthRouter");
const qrRouter = require("./router/qrCodeRoutes");
const barCode = require("./router/barCodeRouter");
//const restrictUser = require("./middleware/authMiddleware");

// Controller
const { handleRedirectURL } = require("./controller/urlControl");

// EJS Setup
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRouter);
app.use("/shorturl", shortUrlRouter);
app.use("/Barcode", barCode);
app.use("/qr", qrRouter);
app.use("/", staticRouter);

// Short URL Redirect
app.get("/:id", handleRedirectURL);

// Start Server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));