import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Lottie from 'lottie-react';
import Animation from '../../../public/Error404.json';
import useDocumentTitle from '../../Hooks/useDocumentTitle';


const NotFound = () => {
      useDocumentTitle("404 Not Found || Market Monitor")  
  return (
    <>
       <div className="min-h-screen  flex flex-col items-center justify-center bg-base text-center px-4">
      <Lottie className='shadow-2xl mb-4 rounded-4xl' animationData={Animation} loop={true}/>
      <h2 className="text-3xl font-bold text-red-600 mb-4">Oops! Page Not Found</h2>
      <p className=" mb-6 max-w-md">
        The page you are looking for might have been removed or does not exist. Please check the URL or go back to the homepage.
      </p>
      <button className=" buttonUI btn btn-primary  font-bold hover:shadow-xl my-3  gap-2  hover:bg-linear-to-br   px-6 py-2 rounded-md text-lg "><Link to="/" className='flex gap-2 items-center' > <FaHome/> Go back to Home</Link>
      </button>
    </div> </>
  );
};

export default NotFound;
