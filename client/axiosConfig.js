import axios from "axios";

const axiosConfig = (token = null) => {
    // console.log(process.env.REACT_APP_SERVER_URL)
    console.log(process.env.serverUrl)
    const instance = axios.create({
        baseURL: process.env.serverUrl,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
    })
    
    instance.interceptors.request.use(function (config) {
        
        config.headers = {
            authorization: token ? `Bearer ${token}` : '',
            // Cookie: 'cookie1=hello'
        }
        // console.log(config)
        return config
    }, function(e) {
        return Promise.reject(e)
    })
    
    
    instance.interceptors.response.use(function(response) {
    
        return response
    }, function(e) {
    
        return Promise.reject(e)
    })

    return instance
}
export default axiosConfig