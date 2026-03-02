import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/Home/HomeLayout";
import ErrorPage from "../Components/Errors/ErrorPage";
import About from "../Components/Static/About";
import Contact from "../Components/Static/Contact";
import TC from "../Components/Static/TC";

const router = createBrowserRouter([
    {
        path:"/",
        element:<HomeLayout></HomeLayout>,
        children:[
            {
                index: true,
                element:<>
                </>
            },
            {
                path:"/about",
                element: <About></About>,
            },
            {
                path:"/contact",
                element: <Contact></Contact>,
            },
            {
                path:"/terms",
                element: <TC></TC>,
            },
        ]
    },
    {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
])
export default router;