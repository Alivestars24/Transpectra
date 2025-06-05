import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, description,image, formType }) {
  const loading = false;

  return (
    <div className="relative flex h-screen items-center justify-center z-0 bg-gray-100">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="relative flex flex-col md:flex-row shadow-lg rounded-lg z-50 bg-white max-w-4xl mx-auto w-full overflow-hidden">
          
          {/* Left Image Section */}
          <div className={` ${ formType==='signup' ? "w-5/12" : "w-1/2"} flex items-center justify-center`}>
            <img
              src={image}
              alt="Illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form Section */}
          <div className="w-full md:w-7/12 p-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              {title}
            </h1>
            <p className="text-gray-600 opacity-75 mb-6">
              {description}
            </p>

            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>

          
        </div>
      )}

      {/* Go Back to Home Link */}
      <Link to="/" className={`absolute bottom-14 left-48 ${ formType==='signup' ? "bottom-5 left-48" : "bottom-14 left-48"} text-dblue text-sm underline`}>
        Go back to Home
      </Link>
      {/* Decorative Corner Image */}
      {/* <img
            src={cornerImage}
            alt="Decorative Element"
            className="absolute z-10 bottom-0 right-0 h-24 w-5/12 opacity-80"
          /> */}
    </div>
  );
}

export default Template;

