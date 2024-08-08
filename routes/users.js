const express = require("express");

const {users} = require ("..users.json/data/");

const router = express.Router();


router.get("/",(req,res)=>{
    res.status(200).json({
        success: true,
        data: users,
    });
});
//day 1 

// Get the user
router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "user doesn't find..!",
        });
    }else {
    return res.status(200).json({
        success: true,
        message: "user Found...",
        data: user,
    });
    }
});

// Adding a user
 router.post("/", (req,res)=>{
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
 router.put("/:id",(req,res)=>{
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
 
 router.delete("/:id",(req,res)=>{
    const {id} =req.params;
    const user = users.find((each) => each.id === id);
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "user Doesn't found",
        });
    }
    const index =users.indexOf(user);
    users.splice(index,1)

    return res.status(200).json({
        success: true,
        message: "User Deleted..",
        data: users,
    });
 });

 module.exports = router;