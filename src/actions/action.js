import { CREATE_USER, CREATE_USER_ERROR } from "./type";
import axios from "axios";

const createUser = newUser => async(dispatch)=>{
    try {
    dispatch({ type: CREATE_USER, ...newUser });
    const response = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/users',
        data: { user: newUser },
        crossdomain: true,
    });
    const { token } = response.data;
		localStorage.setItem('jwt', token);	
	} catch {
		dispatch({ type: CREATE_USER_ERROR });
	}
}

export default createUser