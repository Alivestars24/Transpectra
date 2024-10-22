import signupImg from "../assets/Images/signup1.png"
import Template from "../components/core/Template"

function Signup() {
  return (
    <Template
      title="Create Your Account"
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup;