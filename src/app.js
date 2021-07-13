const express = require("express");
const path = require("path");
var hbs = require("hbs")
const app = express();
const port = process.env.Port || 8000;
const staticpath = path.join(__dirname, "../public")
viewpath = path.join(__dirname, "../templates/views");
var partialpath = path.join(__dirname, "../templates/partials")

// using template engine
app.use(express.static(staticpath))

// set hbs view engine
app.set('view engine', "hbs");
app.set("views", viewpath)

// partialregistration
hbs.registerPartials(partialpath);

// routing
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/about", (req, res) => {
    res.render("about")
})
app.get("/weather", (req, res) => {
    res.render("weather")
})
app.get("*", (req, res) => {
    res.render("404error"), {
        errorMSG: "Opps! Page Not Found"
    }
})

// port listening
app.listen(port, () => {
    console.log("Listening to the port")
})