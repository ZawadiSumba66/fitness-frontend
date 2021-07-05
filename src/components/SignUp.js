import { connect } from 'react-redux';
import authReducer from '../reducers/user';

const SignUp =({ newUser, user, history })=>{
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [avatar, setAvatar] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async(e) =>{
      e.preventDefualt()
		const imgPath = await uploadFile(avatar);
		avatar = imgPath;
		await newUser({username, email, password,passwordConfirmation, avatar});
		if (user.isLogin === true) {
			history.push('/');
		} else {
			setMessage('welcome');
            return message
		} 
    }

    const uploadFile = async(imageFile) => {
       const formData = new FormData();
		formData.append('file', imageFile);
		formData.append('upload_preset', 'avatar');
		const response = await axios({
			url: 'http://localhost:3000/rails/active_storage/direct_uploads',
			method: 'POST',
			data: formData,
		});
		return response.data.secure_url;
    }

 return(
     <form onSubmit={handleSubmit}>
    <input 
      value={userName}
      onChange={(e)=> setUserName(e.target.value)}
      type="text"
      name="username"
      placeholder="Username"
    />
      <input 
      value={email}
      onChange={(e)=> setEmail(e.target.value)}
      type="text"
      name="email"
      placeholder="Email"
    />
      <input 
      value={password}
      onChange={(e)=> setPassword(e.target.value)}
      type="text"
      name="password"
      placeholder="Password"
    />
      <input 
      value={passwordConfirmation}
      onChange={(e)=> setPasswordConfirmation(e.target.value)}
      type="text"
      name="passwordconfirmation"
      placeholder="Password Confirmation"
    />
      <input 
      value={avatar}
      onChange={(e)=> setAvatar(e.target.files[0])}
      type="file"
      name="avatar"
    />
      <button type="submit">
          Create Account
        </button>
    </form>
    )  
}

const mapStateToProps = state => ({
	user: state.authReducer.user,
});
const mapDispatchToProps = dispatch => ({
	newUser: estate => dispatch(authReducer(estate)),
});

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)