import axios from 'axios'
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config'

const API_URL = 'http://localhost:8000/'

//Axios Instance
const axiosInstance = axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }
})

//Request Interceptor
//it has two callbacks -> For Success & Failure
axiosInstance.interceptors.request.use(
    function (config){
        return config
    }
    ,
    function (error){
        return Promise.reject(error)
    }
)

//Response Interceptor
//it has two callbacks -> For Success & Failure
axiosInstance.interceptors.response.use(
    function (response){
        //stop loader here
        return processResponse(response) //--> custom Function
    } 
    ,
    function (error){
        //stop loader here
        return Promise.reject(processError(error)) //--> custom Function
    }
)

//////////////////////////////////////////////////////////////////////////////////////
// If success -> return {isSuccess: true, data: Object}                             //
// If failed  -> return {isFailure: true, status: string, msg: string, code: int}   //
//////////////////////////////////////////////////////////////////////////////////////
const processResponse = (response) =>{
    if(response?.status===200){
        return {
            isSuccess: true, 
            data: response.data
        }
    }else{
        return {
            isFailure: true, 
            status: response?.status, 
            msg: response?.msg, 
            code: response?.code
        }
    }
}


const processError = (error) =>{
    //Case--> Request made successfully but server responded with code other than 200,201,202 etc
    // e.g; if we fill wrong signup values {name:1234, username:123, password:1010} backend will send code 500
    if(error.response){    
        console.log('ERROR IN RESPONSE:', error.toJSON())
        return {
            isError:true, 
            msg:API_NOTIFICATION_MESSAGES.responseFailure, 
            code:error.response.status
        }
    }
    //case--> Request made successfully but server didn't responded
    //usually frontend to backend connection issue
    else if(error.request){
        console.log('ERROR IN REQUEST:', error.toJSON())
        return {
            isError:true, 
            msg:API_NOTIFICATION_MESSAGES.requestFailure, 
            code:""
        }
    }
    //Something happened in setting up request that triggers error
    else{
        console.log('ERROR IN NETWORK:', error.toJSON())
        return {
            isError:true, 
            msg:API_NOTIFICATION_MESSAGES.networkError, 
            code:""
        }
    }
}


const API = {}


for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress)=>
        axiosInstance({
            method: value.method,
            url: value.url,
            data:body,
            responseType: value.responseType,
            //not needed for our program
            onUploadProgress: function (progressEvent){
                if (showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showUploadProgress(percentageCompleted)
                }
            },
            onDownloadProgress: function (progressEvent){
                if (showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted)
                }
            },
        })
}

export { API }