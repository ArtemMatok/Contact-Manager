import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Page/HomePage/HomePage";
import DataPage from "../Page/DataPage/DataPage";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<App />,
        children:[
            {path:"", element:<HomePage />},
            {path:"/data", element:<DataPage />},
        ]
    }
])