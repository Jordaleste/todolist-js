const express = require("express");
//not sure if require ejs is needed... works without for this project.
//const ejs = require("ejs");
//bodyParser allows us to parse form data on post requests. Can now use req.body.x
const bodyParser = require("body-parser");

//Here we are requiring our date.js file, which is a module. We use this to seperate the logic out of the app.get call
const date = require(__dirname + "/date.js");

const app = express();

//Global variables
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

//Here we have our application use bodyParser, with the urlencoded type, which is for form data.
//setting extended to true allows us to host nested objects. This is a requirement of bodyParser, must set even though we don't use.
//gives us access to res.body property, where our data from the form is stored.
app.use(bodyParser.urlencoded({ extended: true }));

// Need express.static with folder name to be able to use local hosted files, such as css and image files, when using express.
// If we don't use this, the local files will not be loaded by the server.
// We place our local hosted css and image files in this folder. It must be named 'public'.
app.use(express.static("public"));

//Using ejs installed via node in terminal. ejs is a view engine used to pass data through templates.
//ejs requires a "views" folder and a .ejs file (any name) contained in the views folder.
//then we can send the ejs file as the html page with app.get
//res.render('fileName', { ejsVariable: dataToPass});
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    //setting a day variable to our module date, and calling the function by adding ()
    const day = date.getDay();
    //All ejs variables must be listed here
    res.render("list", { listTitle: day, newListItems: items });
});

//handeling our post request from list.ejs
app.post("/", function (req, res) {
    //adding our newItem to our items array. Then redirecting to the root / home page
    //to refresh the page with the new item added. Item gets added in the app.get call
    //through res.render, where the items array is used.

    let item = req.body.newItem;

    //whichList is the name of our button, which is a req.body property
    if (req.body.whichList === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

//setting up our localhost:3000/work page. We ship list.ejs with different title / todo list array
app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
