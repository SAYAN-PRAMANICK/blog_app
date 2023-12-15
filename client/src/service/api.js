import axios from 'axios'

const API_B = 'http://localhost:8000'
const API_F = 'http://localhost:3000'

export const signupUser = (payload) =>{
    return axios.post(`${API_B}/signup`,payload)
}