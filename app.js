const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const path = require('path');
const upload = require('./config/multerconfig');


const postModel = require('./models/posts');
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.get("/", (req, res) => {
    res.render("index");
})

app.get("/profile/upload", (req, res) => {
    res.render("profileupload");
})

app.post("/upload", isLoggedin, upload.single("image"), async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
    user.profilepic = req.file.filename;
    await user.save();
    res.redirect("/profile");
})


app.post("/register", async (req, res) => {
    let { username, name, age, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.status(500).send("Oops!!User already exists");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                name,
                age,
                email,
                password: hash
            });
            let token = jwt.sign({ email: email, userid: user._id }, "secret");
            res.cookie("token", token);
            res.redirect("/profile");
        })
    })

})



app.post("/post", isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let { content } = req.body;
    let post = await postModel.create({
        user: user._id,
        content
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
});

app.get("/profile", isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("posts");
    res.render("profile", { user });

})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.redirect("/login");

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "secret");
            res.cookie("token", token);
            res.status(200).redirect("/profile");
        }
        else res.redirect("/login");
    })



})
app.get("/like/:id", isLoggedin, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    if (post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid);
    }
    else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }

    await post.save();
    res.redirect("/profile");
})

app.get("/edit/:id", isLoggedin, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    res.render("edit", { post });
})
app.get("/delete/:id", isLoggedin, async (req, res) => {
    let post = await postModel.findOneAndDelete({ _id: req.params.id }).populate("user");
    res.redirect("/profile");
})

app.post("/update/:id", isLoggedin, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content });

    res.redirect("/profile");
})


app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/login");
})


function isLoggedin(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log("No token found, redirecting to login");
            return res.redirect("/login");
        }

        // Verify the token
        const data = jwt.verify(token, "secret");

        // Attach user data to the request object
        req.user = data;
        // console.log("Token verified, user data:", req.user);

        // Proceed to the next middleware/route handler
        next();
    } catch (err) {
        console.log("Token verification failed:", err.message);
        return res.redirect("/login");
    }
}



app.listen(4000);