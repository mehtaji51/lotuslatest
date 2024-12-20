import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL + '/course';

const createNewCourseProxy = async(newCourseObj) => {
      try {
        const response = await axios.post(`${BASE_URL}/create-new-course`, newCourseObj);
        console.log(response)
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || 'Error creating new course');
      }
    }
export default createNewCourseProxy;