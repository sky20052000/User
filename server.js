const express = require('express');
const config = require("./config/config.json");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// configration
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

//db connection
mongoose.connect(config.MONGO_URL).then((data)=>{
    console.log("db connected ");
});

// routes
app.use("/users", require("./routes/users"));
const port = process.env.PORT || 5001;
app.listen(port,()=>{
    console.log(`server running on the:${port}`);
});