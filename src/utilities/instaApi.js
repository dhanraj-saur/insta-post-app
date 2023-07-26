
import axios from "axios"; 

// instacnce of axios
const instaApi = axios.create({
    baseURL: "https://instagram-express-app.vercel.app/api",
   
})

// export default instaApi;

const postapi = axios.create({
    baseURL: "https://instagram-express-app.vercel.app/api/post/",
    headers: {
        Authorization: `Bearer token`
    }
})