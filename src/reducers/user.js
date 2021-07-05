import { CREATE_USER, CREATE_USER_ERROR } from "../actions/type";

const initialState ={
    isLogin: false,
	user: {
		username: '',
		email: '',
		password: '',
        passwordConfirmation: '',
		avatar: '',
	}
}

const authReducer =(state=initialState, sction)=>{
   switch(action.type){
       case CREATE_USER:
           return{
               ...state.user,
               isLogin: true,
               user:{
                username: action.username,
				email: action.email,
				password: action.password,
                passwordConfirmation: action.passwordConfirmation,
				picture: action.picture,
               }
           }
           case 'CREATE_USER_ERROR':
            return {
			isLogin: false,
		};
		default: 
        return state;
   }
}

export default authReducer