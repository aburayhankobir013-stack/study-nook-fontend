import { BsLinkedin } from "react-icons/bs";
import { FaCopyright, FaFacebook, FaGithub, FaTwitterSquare } from "react-icons/fa";
import { FaSquareYoutube } from "react-icons/fa6";
import { GiOpenBook } from "react-icons/gi";



export default function Footer () {
  return (
   <div className="container mx-auto bg-black text-white items-center p-4 flex flex-col gap-5">
      {/* Main container */}
      <div className="flex flex-col items-center gap-2">
        {/* Heading container */}
        <div className="flex items-center gap-2">
          <GiOpenBook size={25} className="text-green-500" />
          <span className="font-bold text-xl xs:text-2xl lg:text-3xl bg-linear-to-r from-green-600 to-indigo-600 bg-clip-text text-transparent">Study Nook</span>
        </div>
        <h1 className="font-semibold text-xl text-center">Smart Library & Study Space Management System</h1>
        <p className="text-center">Book study rooms, manage library resources and improve learning experience.</p>
      </div>
      <div className="flex flex-col items-center gap-2.5 md:flex-row md:gap-10">
        {/* Information container */}
        <ul className="flex flex-col items-center md:self-start md:items-start">
          <h1 className="font-bold text-lg text-green-500">Contact Section</h1>
          <li>Email: aburayhankobir013@gmail.com</li>
          <li>Phone: 01322731785</li>
          <li>Location: Dhaka, Bangladesh</li>
        </ul>
        <ul className="flex flex-col gap-2 items-center md:items-start">
          <h1 className="text-lg font-bold text-green-500">Social media section</h1>
          <li className="flex items-center gap-1">
            <FaFacebook />
            <span>Facebook</span>
          </li>
          <li className="flex items-center gap-1">
            <FaSquareYoutube />
            <span>YouTube</span>
          </li>
          <li className="flex items-center gap-1">
            <FaTwitterSquare />
            <span>Twitter</span>
          </li>
          <li className="flex items-center gap-1">
            <FaGithub />
            <span>GitHub</span>
          </li>
          <li className="flex items-center gap-1">
            <BsLinkedin />
            <span>LinkedIn</span>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-2">
        {/* Copyright container */}
        <FaCopyright />
        <span>2026 Study Nook. All rights reserved</span>
      </div>
   </div>
  );
}