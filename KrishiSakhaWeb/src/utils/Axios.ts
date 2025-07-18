import axios, { AxiosResponse } from "axios";

let  username = ""
let jwt =""

const apiSerice = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 10000,
});

const setUsername=(s:string)=>{
    username = s
}

const setJwt=(j : string)=>{
    jwt=j
}

apiSerice.interceptors.request.use((config) => {
    console.log(jwt);
    
    config.headers['Authentication'] = `bearer ${jwt}`;
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
)

apiSerice.interceptors.response.use(
    (response: AxiosResponse) => response, // Pass successful responses
    async (error) => {
        const originalRequest = error.config;

        // Check for 401 Unauthorized response
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Check for a new JWT in the error response headers
            const newJwt = error.response.headers['Authentication'];
            if (newJwt) {
                // Update JWT in global state and storage
                jwt = newJwt

                // Retry the original request with the new JWT
                originalRequest.headers['Authentication'] = `Bearer ${jwt}`;
                return apiSerice(originalRequest);
            } else {
                console.error('No JWT provided in the response headers');
                // Redirect to login if no JWT is provided
                window.location.href = '/login'; // Adjust for your routing
            }
        }

        // If not a 401 or retry failed, reject the error
        return Promise.reject(error);
    }
)


export { apiSerice,username,setUsername,setJwt }