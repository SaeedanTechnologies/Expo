import { useRoutes } from "react-router";
import Landing from "./page/landing/Landing";

export default function Router() {
    let element = useRoutes([
        {
            path: '/',
            element: <Landing />,
        },


    ])
    return element
}