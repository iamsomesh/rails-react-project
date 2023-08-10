import axios from 'axios'

const BaseUrl = 'http://localhost:3000'


const signUpApi = async(userdata)=>{
    const body = userdata
    const data = await axios.post(`${BaseUrl}/users/`,body)
    return data

}

const loginApi = async(userdata)=>{
    const body = userdata
    const data = await axios.post(`${BaseUrl}/users/sign_in`,body)
    return data
}

const logOutApi = async()=>{
    const header={headers: { 
        'Authorization': localStorage.getItem('token'),
        'Content-Type' : 'text/plain' 
    }}
    const data = await axios.delete(`${BaseUrl}/users/sign_out`,header)
    return data
}

const getEmailApi = async()=>{
    const header={headers: { 
        'Authorization': localStorage.getItem('token'),
        'Content-Type' : 'text/plain'
        
    }}
    const data = await axios.get(`${BaseUrl}/list_referred_emails`,header)
    return data
}

const sendEmailApi = async(body)=>{
    const header={headers: { 
        'Authorization': localStorage.getItem('token'),
        'Content-Type' : 'application/json'  
    }}
    const data = await axios.post(`${BaseUrl}/send_referral/`,body,header)
    return data
}


export {signUpApi,loginApi,getEmailApi,logOutApi,sendEmailApi}