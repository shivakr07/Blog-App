// API_NOTIFICATION_MESSAGES

export const API_NOTIFICATION_MESSAGES = {
    loading : {
        title : 'Loading...',
        message : 'Data is being loaded, please wait'
    },
    success : {
        title : 'Success',
        message : 'Data successfully loaded'
    },
    responseFailure : {
        title : 'Error',
        message : 'An error occurred while fetching response from the server. Please try again ...'
    },
    requestFailure: {
        title : 'Error',
        message : 'An error occured while parsing request data'
    },
    networkError :{
        title : 'Error',
        message : 'Unable to connect with the server. Please check the internet connectivity and try again later'
    }
}

//API SERVICE CALL
//sample request
//need service call : {url : '/', method : 'POST/GET/PUT/DELETE' params : true/false, query : true/false}
export const SERVICE_URLS = {
    userSignup : {url : '/signup', method : 'POST'},
    userLogin : {url : '/login', method : 'POST'}
    //each time you just need to add an Object and your api is done
} 