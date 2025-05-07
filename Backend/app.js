const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require('cors');
const ejsmate = require("ejs-mate");
const { verifyToken, restrictTo } = require("./middleware/authMiddleware");

dotenv.config();

const app = express();
const port = 8080;

// Models
require("./models/admin");
require("./models/buyer");
require("./models/product");
require("./models/seller");
require("./models/warehouse");

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsmate);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); 


// DB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Routes
app.get("/", (req, res) => res.send("okkk"));

app.use("/auth", require("./routes/authRoutes")); // login/register

app.get('/auth/check', verifyToken, (req, res) => {
    // If the token is valid, the user will be attached to the request object by the `verifyToken` middleware
    if (req.user) {
      // Respond with the user's data (like userId, role, etc.)
      return res.json({ user: req.user });
    } else {
      // If the user is not authenticated
      return res.status(401).json({ message: 'Unauthorized' });
    }
  });

// Protected Routes

app.use("/admin", require("./routes/adminRoutes"));
app.use("/seller",require("./routes/sellerRoutes"));
app.use("/buyer",require("./routes/buyerRoutes"));

app.listen(port, () => console.log(`Server running on port ${port}`));
