const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const createAdmin = require("./utils/createAdmin");
const cookieParser = require("cookie-parser");

connectDB();
createAdmin();

const app = express();

app.use(express.static("backend/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS config
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type"],
	})
);
app.get("/", (req, res) => {
	res.send("API is running...");
}
);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);

//! Error Middleware, do not put any routes after this
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log("Server Listening on Port:", process.env.PORT);
});
