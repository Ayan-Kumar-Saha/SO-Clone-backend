require("dotenv").config();

// Import dependencies
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./app/lib/dbConnections");

// Import routers
const authRoutes = require("./app/routes/authRoutes");
const postRoutes = require("./app/routes/postRoutes");

// Define configurations
const PORT = process.env.PORT || 3000;
const jsonParser = bodyParser.json({ limit: "50mb" });
const urlEncodedParser = bodyParser.urlencoded({
	extended: false,
	limit: "50mb",
});
const corsConfig = cors({
	origin: [process.env.UI_HOST_URL || "http://localhost:4200", "http://localhost:4200"],
});

// Create express application
const app = express();

// Define middlewares to the express app
// TODO: Add rate limiter for a particular IP address
// TODO: Setup loggers - winston and morgan
app.use(helmet());
app.use(corsConfig);
app.use(jsonParser);
app.use(urlEncodedParser);

// Use routers as middlewares
app.use("/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Routes
app.get("/ping", (req, res) => {
	res.status(200).send({
		success: true,
		message: "Hi from Server!",
	});
});

app.listen(PORT, () => {
	console.log(`Server is listening at port ${PORT}!`);
});
