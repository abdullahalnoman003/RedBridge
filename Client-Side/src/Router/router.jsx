import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/Home/HomeLayout";
import ErrorPage from "../Components/Errors/ErrorPage";
import About from "../Components/Static/About";
import Contact from "../Components/Static/Contact";
import TC from "../Components/Static/TC";
import Register from "../Components/Authentication/AuthPage/Register";
import Login from "../Components/Authentication/AuthPage/Login";
import Hero from "../Layout/Home/Landing/Hero";
import Slider from "../Layout/Home/Landing/Slider";
import BloodInfo from "../Layout/Home/Landing/BloodInfo";
import Statistics from "../Layout/Home/Landing/Statistics";
import CTA from "../Layout/Home/Landing/CTA";
import FindDonorsPage from "../Components/Donor/FindDonorsPage";
import DonatePage from "../Components/Donor/DonatePage";
import Profile from "../Components/Profile/Profile";
import ForgotPassword from "../Components/Authentication/AuthPage/ForgotPassword";
import AdminLayout from "../Layout/Admin/AdminLayout";
import AdminRoute from "../Components/Authentication/Routes/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <>
        <Hero></Hero>
        <Slider></Slider>
        <BloodInfo></BloodInfo>
        <Statistics></Statistics>
        <CTA></CTA>
        </>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/terms",
        element: <TC></TC>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/find-donors",
        element:  <FindDonorsPage></FindDonorsPage> ,
      },
      {
        path: "/donate",
        element: <DonatePage></DonatePage> ,
      },
      {
        path: "/profile",
        element: <Profile></Profile> ,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword> ,
      },
      {
        path: "/dashboard/admin",
        element: <AdminRoute><AdminLayout></AdminLayout></AdminRoute>,
      },
      {
        path: "/*",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
]);
export default router;
