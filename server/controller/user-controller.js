// here we define api 
import bcrypt from 'bcrypt';
//since here we are going to encrypt our p/w as here we are getting body(request.body)
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from "../model/user.js";
import Token from '../model/token.js';

dotenv.config();
export const signupUser = async(request, response) => {
    try{
        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, 10)

        // now we need to replace the password with the hashed password so in 

        // const user = request.body;
        const user = {username : request.body.username, name :request.body.name, password : hashedPassword }
        
        //and you have to validate the data coming from the frontend so we define schema in model folder and use here
        const newUser = new User(user);
        //newUser is validated object and now we need to store it in db
        await newUser.save();
        //now you send on frontend
        return response.status(200).json({msg : 'signup successfull'})
    }catch(error){
        return response.status(500).json({msg : 'Error while signup the user'})
    }
}

export const loginUser = async(request, response) => {
    // here we get username and the password through the api hit in request body
    let user =  await User.findOne({username : request.body.username});
    if(!user){
        return response.status(400).json({msg : 'Username does not match'})
    }

    try{
        let match = await bcrypt.compare(request.body.password, user.password);
        if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn : '15m'} );
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY );

            const newToken = new Token({token : refreshToken})
            await newToken.save();

            return response.status(200).json({accessToken : accessToken, refreshToken : refreshToken, name : user.name, username : user.username});

        } else{
            return response.status(400).json({msg : 'Password does not match'});
        }
    } catch (error){
        return response.status(500).json({msg : 'Error while login in User'})
    }
}


