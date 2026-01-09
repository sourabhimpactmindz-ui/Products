import axios from "axios";

const axiosInstance=axios.create({
    baseURL:'http://localhost:3001/api',
    withCredentials:true
});

axiosInstance.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('jwtToken');
        console.log(token);
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

export default axiosInstance;