import axios from 'axios';
const BASE_URL =  process.env.NEXT_PUBLIC_API_BASE_URL
console.log(BASE_URL)
const axiosInstance = axios.create({
 baseURL:BASE_URL,
 timeout:10000,
 headers:{
    'Content-Type':'application/json'
 },
 withCredentials:true
});
export default axiosInstance;