
import { Box, TextField, Button, styled, Typography } from '@mui/material'
// import { textAlign } from '@mui/system'
// since we want conditional rendering of Login and signup so we'll use states
import { useState, useContext } from 'react'

import { API } from '../../service/api'
import { DataContext } from '../../context/DataProvider'

import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width : 400px;
    margin : auto;
    box-shadow : 5px 2px 5px 2px rgb(0 0 0/ 0.6);

`
const Image = styled('img')({
    width : 300,
    height : 100,
    display : 'flex',
    margin : 'auto',
    padding : '50px 0 0'
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display : flex;
    flex : 1;
    flex-direction : column;
    & > div , & > Button, & > p{
        margin-top : 20px;
    } 
`
const SignupButton = styled(Button)`
    text-transform : none;
    background : #fff;
    color : #2874f0;
    height : 48px;
    border-radius : 2px;
    box-shadow : 0 2px 4px 0 rgb(0 0 0/ 20%)
`

const Error = styled(Typography)`
    fonr-size : 10px;
    color : #ff6161;
    line-height : 0;
    font-weigh : 600;
    margin-top : 10px;
`

const Text = styled(Typography)`
    color : #878787;
    font-size : 16px;
`

const LoginButton = styled(Button)`
    text-transform : none;
    background : #FB641B;
    color : #fff;
    height : 48px;
    border-radius : 2px;
`
const signupInitialValues = {
    name : '',
    username : '',
    password : ''
}

const loginInitialValues = {
    username : '',
    password : ''
}

const Login = ({ isUserAuthenticated}) => {

    // const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const imageURL = 'https://raw.githubusercontent.com/shivakr07/React/master/keeper-app-part-1-starting/src/blogapp1.png';
    // const imageURL = 'https://github.com/shivakr07/React/blob/master/keeper-app-part-1-starting/src/blogapp1.png';

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const { setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
        //since we are using same handler function so need to use ternary operator
        account === 'signup'? toggleAccount('login') : toggleAccount('signup');
    }
    const onInputChange = (e) => {
        setSignup({...signup, [e.target.name] : e.target.value});
    }

    //till now we have connected db, setted routes and made api and
    // on click of the button we have to hit/call the api using this function
    const signupUser = async() => {
        // so first we need to make api in service folder/api.js in src
        let response = await API.userSignup(signup);
        if (response.isSuccess){
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login')
        }else{
            setError('something went wrong! please try again later');
            //to display the user side
            // so we make a state 
        }
    }

    const onValueChange = (e)=> {
        setLogin({...login, [e.target.name] : e.target.value})
    }

    const loginUser = async() => {
        //call api
        let response = await API.userLogin(login);
        if(response.isSuccess){
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`)
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`)
            // name
            // username
            setAccount({ username : response.data.username, name : response.data.name})

            isUserAuthenticated(true); 
            
            navigate('/');    

        }else{
            setError('Something went wrong! please try again later');
        }
    }
    return(
        <Component>
            <Box>
                <Image src={imageURL} alt='Login'/>
                {
                     account === 'login' ?
                    <Wrapper>
                        <TextField  variant='standard' value = {login.username} onChange = {(e) => onValueChange(e)} name="username" label="Enter username"/>
                        <TextField  variant='standard' value = {login.password} onChange = {(e) => onValueChange(e)} name="password" label="Enter password"/>

                        { error && <Error>{error}</Error> }

                        <LoginButton variant='contained' onClick = {() => loginUser()}>Login</LoginButton>
                        <Text style={{textAlign:'center'}}>OR</Text>
                        <SignupButton onClick={ () => toggleSignup()}>Create an Account</SignupButton>
                    </Wrapper> 
                    :
                    <Wrapper>
                        <TextField  variant='standard' onChange={(e) => onInputChange(e)} name = 'name' label="Enter name"/>
                        <TextField  variant='standard' onChange={(e) => onInputChange(e)} name = 'username' label="Enter username"/>
                        <TextField  variant='standard' onChange={(e) => onInputChange(e)} name = 'password' label="Enter password"/>

                        { error && <Error>{error}</Error> }

                        <SignupButton onClick={ () => signupUser()}>Signup</SignupButton>
                        <Text style={{textAlign:'center'}}>OR</Text>
                        <LoginButton variant='contained' onClick={ () => toggleSignup()}>Already have  an Account</LoginButton>
                    </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;