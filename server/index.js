const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const port = process.env.PORT || 8000;
const User = require("./User/user")
// const playersRouter = require("./routes/players");
var mongoose = require('mongoose');

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/players", playersRouter);
app.use("/", User);

app.listen(port, function () {
  console.log("Runnning on " + port);
});

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });


// var AuthController = require('./User/AuthController');
// app.use('/api/auth', AuthController);

mongoose.connect("mongodb://localhost/payslip",
  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
      console.log("Db connected successfully");
    }
    else {
      console.log("Db connection failed")
    }
  })

module.exports = app;
