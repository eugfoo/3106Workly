// Middleware to handle requests to undefined routes (404 Not Found)
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// Middleware to handle errors globally
const errorHandler = (err, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let message = err.message;

	// Handle Mongoose CastError (invalid ObjectId)
	if (err.name === "CastError" && err.kind === "ObjectId") {
		statusCode = 404;
		message = "Resource not found";
	}

	// Send error response with stack trace in development mode
	res.status(statusCode).json({
		message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

module.exports = { notFound, errorHandler };
