const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");

const { initializeDB } = require("./config/db.config");
dotenv.config()
 
initializeDB(process.env.URI);
const PORT = process.env.PORT || 8000;
 
const app = express();

app.get("/",(req,res,next) => {
    res.send("Server is running");
})

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/users",userRoutes);
app.use("/posts",postRoutes);

app.listen(PORT,() => console.log(`Server is running on ${PORT}`))
