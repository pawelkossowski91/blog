const fs = require("fs");
const express = require("express");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const shortid = require("shortid");
const slugify = require("slugify");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtVerify = require("express-jwt");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const SECRET_KEY = fs.readFileSync("private.key");

/* Middleware */
// const validateJWT = [
//     jwtVerify({
//         secret: SECRET_KEY,
//         credentialsRequired: false
//     }),
//     (req, res, next) => {
//         if(!req.user) {
//             return res.status(401).json({
//                 error: "Unauthorized"
//             })
//         } else {
//             next();
//         }
//     }
// ];

const validateJWT = [
    (req, res, next) => next()
];

app.use( cors() );
app.use( bodyParser.json() );

/* Routes */
app.get("/posts", function(req, res) {

    const posts = db.get("posts").value();

    res.json(posts);

});

app.post("/posts", ...validateJWT, function(req, res) {

    const posts = db.get("posts")
        .push({
            id: shortid.generate(),
            slug: slugify(req.body.title, { lower: true }),
            title: req.body.title,
            date: req.body.date,
            content: req.body.content
        })
        .write();

    res.json( posts.pop() );

});

app.get("/post/:slug", function(req, res) {

    const post = db.get("posts").find({ slug: req.params.slug }).value();

    if(post) {
        res.json(post);
    } else {
        res.status(404).json({
            error: "Not Found"
        });
    }

});

app.put("/post/:id", ...validateJWT, function(req, res) {

    const post = db.get("posts")
        .find({ id: req.params.id });

    if( !post.value() ) {
        return res.status(404).json({
            error: "Not Found"
        });
    }

    const result = post
        .assign({
            id: post.value().id,
            slug: slugify(req.body.title, { lower: true }),
            title: req.body.title,
            date: req.body.date,
            content: req.body.content
        })
        .write();

    res.json(result);

});

app.delete("/post/:id", ...validateJWT, function(req, res) {

    const post = db.get("posts")
        .find({ id: req.params.id });

    if( !post.value() ) {
        return res.status(404).json({
            error: "Not Found"
        });
    }

    db.get("posts")
        .remove({ id: req.params.id })
        .write();

    res.json({
        success: true
    });

});

app.post("/login", function(req, res) {

    const user = db.get("users")
        .find({ username: req.body.username }).value();

    if(!user) {
        return res.status(401).json({
            error: "Unauthorized"
        })
    }

    const passwordMatch = bcrypt.compare(req.body.password || "", user.password, function(err, result) {

        if(err) {
            console.log(err);
            return res.status(500).json({
                error: "Internal Server Error"
            })
        }

        if(result === false) {
            return res.status(401).json({
                error: "Unauthorized"
            })
        }

        if(result === true) {

            const token = jwt.sign({
                username: user.username
            }, SECRET_KEY, {
                expiresIn: "1h"
            })

            return res.json({ token });

        }

    });

});

/* Start */
app.listen(3000, () => console.log("Serwer został uruchomiony pod adresem http://localhost:3000"));