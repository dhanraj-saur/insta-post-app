
import axios from "axios"; 

// instacnce of axios
export const instaApi = axios.create({
    baseURL: "https://instagram-express-app.vercel.app/api",
   
})

// export default instaApi;

export const postapi = axios.create({
    baseURL: "https://instagram-express-app.vercel.app/api/post/",
    headers: {
        Authorization: `Bearer token`
    }
})