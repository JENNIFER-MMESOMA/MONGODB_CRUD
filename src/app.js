const express = require("express");
const User = require("./models/userModel");
const app = express();

// global middleware to accept json data
app.use(express.json());

// server health check
app.get("/", (req, res) => {
    res.json({ message: "server is live"});
});

// create new user
app.post("/users", async(req, res)=>{
    const {firstName,lastName, dob, password, email}= req.body;
    try {
        // create a user data object from user info
        const userData = {
            firstName,
            lastName,
            email,
            dob,
            password,
        };

        // create a new instance of user from user model
        const newUser = new User(userData);

        // save user data on database
        await newUser.save();

        // check if user info fails to save on the database
        if(!newUser) {
            return res.status(400).json({error: "user creation failed"});
        }

        // return success response if operation is successful
        return res
        .status(201)
        .json({message: "user created successfully", newUser});
    } catch (error) {
        res.status(500).json({error: "something went wrong"});
    }
});

// get all users on database
app.get("/users", async (req, res)=>{
    try{
        const users = await User.find();

        // check if there are no users in database
        if(!users || users.length <= 0) {
            return res.status(404).json({error: "no user found"});
        } 

        // return success response if operation is successful
        return res.status(200).json({message: "users found successfully", users});
    } catch (error) {
        res.status(500).json({error: "something went wrong"});
    }
});

// get single user
app.get("/users/:userId", async(req, res)=>{
    // get dynamic user Id from requestparaameter
    const { userId} = req.params;
    try{
        const user = await User.findById(userId);
   
    // check if user is not found
    if(!user){
        return res.status(404).json({error: "user not found"});
    }

    return res.status(200).json({message: "user found", user});
    }catch(error){
         res.status(500).json({error: "something went wrong"})
    }
});

// to update
app.put('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const { firstName,lastName, dob, password, email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, {firstName,lastName, dob, password, email }, 
            { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// to delete a user
app.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});


module.exports = app;