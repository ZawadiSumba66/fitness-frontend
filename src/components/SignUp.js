import { connect } from 'react-redux';

const SignUp =()=>{
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [avatar, setAvatar] = useState('')
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
      onChange={(e)=> setAvatar(e.target.value)}
      type="file"
      name="avatar"
    />
      <button type="submit">
          Create Account
        </button>
    </form>
    )  
}

export default SignUp