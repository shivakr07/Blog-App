// now we call an api
// we have multiple methods (request method of js is deprecated )
// like fetch of es6 or
// library axios and interceptors
// keep in mind axios should be installed in client folder

import axios from 'axios';

import { API_NOTIFICATION_MESSAGES , SERVICE_URLS} from '../constants/config.js'
// now we use axios interceptors
// initially we were making the separate api's for each type of req
//we will make common api using interceptors
const API_URL = 'http://localhost:8000';
// we need this backend url

const axiosInstance = axios.create({
    baseURL : API_URL,
    timeout : 10000 ,
    headers : {
        "Content-Type" : 'application/json'
    }
})
// now with the help of instance we will make interceptors
// first we make interceptors of request and then make for instance
axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function (error){
        return Promise.reject(error);
    }
)
axiosInstance.interceptors.response.use(
    function(response){
        //stop global loader here
        return processResponse(response);
    },
    function (error){
        //stop global loader here
        return Promise.reject(processError(error));
    }
)
//defining function
// we process getting response 
//  this is the common response for all the api's **
// if success -> return {isSucess : true, data : Object}
//if fail -> return {isFailure : true, status : string, msg : string, code : int}
const processResponse = (response) => {
    if(response?.status === 200){
        return{ isSuccess : true, data : response.data}
    }else{
        return{
            isFailure : true,
            status :  response?.status,
            msg : response?.msg,
            code : response?.code
        }
    }
}
//similarly we define for error for sucessfull we have defined above
// but error are of three types either we get response in error or request or nothing

// if success -> return {isSucess : true, data : Object}
//if fail -> return {isFailure : true, status : string, msg : string, code : int}
const processError = (error) => {
    if(error.response){
        // request made and server responded with a status other than 200
        // that falls out of the range 2.x.x
        console.log('Error in RESPONSE : ', error.toJSON());
        return{
            isError : true,
            msg : API_NOTIFICATION_MESSAGES.responseFailure,
            code : error.response.status
        }
    }else if(error.request){
        // request made but no response was received
        console.log('Error in REQUEST', error.toJSON());
        return{
            isError : true,
            msg : API_NOTIFICATION_MESSAGES.responseFailure,
            code : ""
        }
        
    }else{
        // fronend mistake // something in setting up request that triggers an error
        console.log('Error in NETWORK', error.toJSON());
        return{
            isError : true,
            msg : API_NOTIFICATION_MESSAGES.responseFailure,
            code : ""
        }
    }
}

// in case of api response delay so it go in pending so we are giving 10 sec in timeout
// in general in project
// we show loader when we make api request and when you get response then
// you stop that loader so you can stop there(above)
// since we don't have any loader so we are not showing them by stopping them

// ** in case of the request and network error actually 
// request jaati hi nahi hai so koi response hi nahi aata backend se isiliye code wala part "" blank hai

// now we have to make actual api
// so we will make api object and through this we will call the api
//in service 
// since service url is object so we need too loop it since currently we have only one request but later it might be more than one so  we need to loop
const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS) ){
    API[key] = (body, showUploadProgress, showDownloadProgress)=>
        axiosInstance({
            method : value.method,
            url : value.url,
            data : body,
            responseType : value.responseType,
            onUploadProgress : function (progressEvent) {
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress : function (progressEvent) {
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        }) 
    
}

export { API } ;


//btw we don't need of showUploadProgress, showDownloadProgrss because
//these needed when you want to show the bars going from 1---> 100