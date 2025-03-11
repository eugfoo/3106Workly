require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

const serviceRoutes = require('./routes/services');
const authRoutes = require('./routes/auth'); 

app.use('/services', serviceRoutes);
app.use('/auth', authRoutes);


app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
