const userModel = require('../models/userModel');

const loginController = async(req , res) => {
    try {
        const {email , password} = req.body
        const user = await userModel.findOne({email , password})

        if (!user){
            res.status(404).send('User Not Found');
        }
        res.status(200).json({
            status : true, 
            user
        })
    } catch (error) {
        res.status(400).json({
            status : false , 
            error
        })
    }
}

const registerController = async(req , res) => {
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json({
            status : true, 
            newUser
        })
    } catch (error) {
        res.status(400).json({
            status : false , 
            error
        })
    }
}