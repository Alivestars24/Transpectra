import React from "react"
import img from "../assets/Images/home.png"
import { Link } from "react-router-dom"
function Home() {
  return (
    <div className="h-screen bg-blue-5 relative overflow-x-hidden">
       <div className="w-10/12 mx-auto flex flex-row items-center justify-center">
       <div className="text-richblue-500 font-inter">
         <h1 className="text-xl md:text-3xl font-bold mb-4">Streamlining Your Supply Chain from End to End</h1>
         <p className="text-md md:text-[15px] opacity-70 mb-8">Transpectra offers a seamless solution for managing your supply chain, from manufacturers to warehouses. With real-time tracking, smart inventory management, and optimized delivery routes, we ensure smooth and efficient operations. Streamline your logistics and stay in control every step of the way.</p>
         <div className="space-x-4">
           <Link to="/login">
           <button className="bg-blu text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-400 transition duration-300">Login</button>
           </Link>
           <Link to="/signup">
           <button className="bg-blu text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-400 transition duration-300">Sign Up</button>
           </Link>
           </div>
       </div>
       <img src={img} alt="homepage" className="relative w-[610px] h-[500px]"/>
       </div>
     </div>
  )
}

export default Home

// import React from 'react';

// const HomePage = () => {
//   return (
//     <div className="h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('your-background-image-url.jpg')" }}>
//       <div className="text-center text-white">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">Driving Smarter Deliveries Forward</h1>
//         <p className="text-xl md:text-2xl mb-8">Efficiency in Every Walmart Delivery.</p>
//         <div className="space-x-4">
//           <button className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition duration-300">Login</button>
//           <button className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition duration-300">Sign Up</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
