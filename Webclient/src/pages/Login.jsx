import loginImg from "../assets/Images/lo.jpeg"
import Template from "../components/core/Template"

function Login() {
  return (
    <Template
      title="Welcome Back to Transpectra"
      description="Enter the details below to Continue "
      image={loginImg}
      formType="login"
    />
  )
}

export default Login