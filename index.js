const express = require("express");

const usersRouter = require("./data/users.json");
const booksRouter = require("./data/Books.json");

const app = express();

const port = 8081;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "server started up & running..."
    });
});

// app.get("/users",(req,res)=>{
//     res.status(200).json({
//         success: true,
//         data: users
//     });
// });

app.use ("/users",usersRouter);
app.use ("/books",booksRouter);

app.get("*",(req,res)=>{
    res.status(404).json({
        Message: "This route doesn't exists..."
    });
});
app.listen(port,()=>{
    console.log (`server is running at ${port}`);
});
