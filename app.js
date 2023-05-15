const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { default: mongoose, Schema } = require("mongoose");
const todaysDate = require(__dirname + "/date.js");
const port = process.env.PORT || 3000;

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb+srv://poshnjarimatias:w4MG7EpIe8zqDdzG@cluster0.pytytjm.mongodb.net/ToDosAppDB"
);

const toDosSchema = new Schema({
  item: String,
});

const ToDos = mongoose.model("ToDos", toDosSchema);

app.get("/", (req, res) => {
  ToDos.find({})
    .then((foundToDo) => {
      res.render("todo", { todaysDate: todaysDate(), toDos: foundToDo });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/", (req, res) => {
  const toDo = req.body.item;
  const newToDo = new ToDos({
    item: toDo,
  });
  if (toDo) {
    newToDo.save();
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

app.post("/delete", (req, res) => {
  const checkedToDosId = req.body.checkbox;
  ToDos.findByIdAndRemove({ _id: checkedToDosId })
    .then((foundToDoToRemove) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
