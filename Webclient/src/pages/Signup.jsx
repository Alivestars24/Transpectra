import signupImg from "../assets/Images/lo2.jpeg"
import Template from "../components/core/Template"

function Signup() {
  return (
    <Template
      title="Welcome to Transpectra"
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup;