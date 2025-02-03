// Create web server
// npm install express
// npm install body-parser
// npm install ejs
// npm install mongoose
// npm install method-override
// npm install express-sanitizer
// npm install express-session
// npm install connect-flash

// 1. Require modules
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var flash = require("connect-flash");

// 2. Create express app
var app = express();

// 3. Connect to mongoose
mongoose.connect("mongodb://localhost:27017/blog_app", { useNewUrlParser: true });

// 4. Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// 5. Set up ejs
app.set("view engine", "ejs");

// 6. Set up express-sanitizer
app.use(expressSanitizer());

// 7. Set up method-override
app.use(methodOverride("_method"));

// 8. Set up express-session
app.use(require("express-session")({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false
}));

// 9. Set up flash
app.use(flash());

// 10. Define schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
var Blog = mongoose.model("Blog", blogSchema);

// 11. Create blog
// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1617223765900-3b8f5d4f8f8b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     body: "This is a blog post!"
// });

// 12. Set up public directory
app.use(express.static(__dirname + "/public"));

// 13. Middleware
app.use(function(req, res, next) {
    res.locals.error = req.flash("error");
    res