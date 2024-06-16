const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")

const port = 8080;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended:true }));

let jokes = [{
    id: uuidv4(),
    username: "NiceJoker",
    setup: "What do you get when you cross a snowman with a vampire?.",
    punchline: "Frostbite!"
    },
    {
    id: uuidv4(),
    username: "MoneyMaker",
    setup: "Why don't the scientist trust atoms?",
    punchline: "Because they make up everything."
    },
    {
    id: uuidv4(),
    username: "XXGamerXX",
    setup: "What do you call a fake noodle?",
    punchline: "Impasta"
    }]


app.get("/jokes", (req, res) => {
    res.render("index.ejs", {jokes});
});

app.get("/jokes/add", (req, res) =>{
    res.render("add.ejs");
});
app.post("/jokes", (req, res) => {
    let{username, setup, punchline} = req.body;
    let id = uuidv4();
    jokes.push({id, username, setup, punchline});
    res.redirect("/jokes");
});

app.get("/jokes/:id", (req, res) => {
    let {id} = req.params;
    let joke = jokes.find((j) => id === j.id);
    res.render("show.ejs", {joke});
});

app.get("/jokes/:id/edit", (req, res) => {
    let {id} = req.params;
    let joke = jokes.find((j) => id === j.id);
    res.render("edit.ejs", {joke});
});

app.patch("/jokes/:id", (req, res) => {
    let {id} = req.params;
    let joke = jokes.find((j) => id === j.id);
    newJoke = req.body;
    // joke = {...joke, setup: newJoke.setup, punchline: newJoke.punchline};
    joke.setup = newJoke.setup;
    joke.punchline = newJoke.punchline;
    console.log(joke);
    res.redirect("/jokes");
});

app.delete("/jokes/:id", (req, res) => {
    let {id} = req.params;
    jokes = jokes.filter((j) => id!== j.id);
    res.redirect("/jokes");
});

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});