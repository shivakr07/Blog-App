// routes are the end points of the api
//https://facebook.com/login 
//this is api url not browser url

import  express  from "express";

const router = express.Router();
import { signupUser, loginUser } from "../controller/user-controller.js";
router.post('/signup',signupUser);
router.post('/login',loginUser);
//here signup is end point and second one is what api you have to call 
// so you can define it like this router.post('/signup', () => {})
// but this only for routes not for api so we will define the api in new folder as 'controller'
//similarly we can do for the login as well

export default router;