//API_NOTIFICATION_MESSAGES

export const API_NOTIFICATION_MESSAGES = {
    loading:{
        title: 'Loading...',
        message: 'Data is being loaded, please wait!'
    },
    success:{
        success: 'Success',
        message: 'Data successfully loaded!'

    },
    responseFailure:{
        title: 'Error',
        message: 'An error occured while fetching response from the server. Please try again!'
    },
    requestFailure:{
        title: 'Error',
        message: 'An error occured while parsing request data!'
    },
    networkError:{
        title: 'Error',
        message: 'Unable to connect to the server. Please check internet connectivity!'
    }
}


//API SERVICE CALL
//SAMPLE REQUEST BELOW
//NEED SERVICE CALL:{
//                       url:'/', 
//                       method:'POST/GET/PUT/DELETE', 
//                       params: true/false, 
//                       query: true/false
//                   }


export const SERVICE_URLS = {
    userSignup: {url:'/signup', method:'POST'}
}