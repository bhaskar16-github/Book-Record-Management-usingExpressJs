const express = require("express");

const {users} = require("./data/users.json");
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
//day 1 

// Get the user
app.get("/users/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "user doesn't find..!",
        });
    }
    return res.status(200).json({
        success: true,
        message: "user Found...",
        data: user,
    });
});

// Adding a user
 app.post("/users", (req,res)=>{
    const {id, name, surname, email, subscriptionType, subscriptionDate} =
    req.body;

    const user = users.find((each)=>each.id === id);
    if (user){
        return res.status(404).json({
            success: false,
            message: "user ID Exists",
        });
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });
    return res.status(201).json({
        success: true,
        message: "user added succesfuuly",
        data: users,
    });
 });

 // Update user data
 app.put("/users/:id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each) => each.id === id);
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "user Doesn't found",
        });
    }
    const updateUserData = users.map((each)=>{
        if (each.id === id){
            return{
                ...each,
                ...data,
            };
        }
        return each;
    });
    return res.status(201).json({
        success: true,
        message: "User Updated..!",
        data: updateUserData,
    });
 });

 
// app.use ("/users",usersRouter);
// app.use ("/books",booksRouter);


app.get("*",(req,res)=>{
    res.status(404).json({
        Message: "This route doesn't exists..."
    });
});
app.listen(port,()=>{
    console.log (`server is running at ${port}`);
});
