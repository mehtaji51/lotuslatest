import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL + '/user';

const updatePasswordProxy = async(_id, password) => {
    try {
        const data = { _id, password }; 
        const response = await axios.post(`${BASE_URL}/update-password`, data); 
        console.log(response);     
        return response;
    } catch (error) {
        console.error("Error in updatePasswordProxy:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Error updating password'); 
    }
}

export default updatePasswordProxy;
