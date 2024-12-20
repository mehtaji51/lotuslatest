import axios from "axios";
import { setUser } from "../../redux/slice/user/userSlice";
import { getLogedInCookies } from "../../cookie-handler/cookieHandler";


const BASE_URL = process.env.EXPO_PUBLIC_API_URL+ '/cookies';

const deleteUserOnCookies = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/delete-user-cookie`, {body: 'body'},{
        withCredentials: true, // Include cookies in the request
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
    
  
   
    //   if (saveOnCookies.status === 200) {
    //     return saveOnCookies.data.data.user
    //   }
    //   else {
    //     throw new Error("Error saving on cookies")
    //   }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default deleteUserOnCookies;
