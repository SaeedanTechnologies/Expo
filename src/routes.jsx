import { useRoutes } from "react-router";
import Landing from "./page/landing/Landing";
import AdminHome from "./AuthSide/AdminSide1";
import Welcome from "./AuthSide/AdminSide1/Welcome"
import AddEvent from "./AuthSide/AdminSide1/AddEvent";
import AddJudgeMain from "./AuthSide/AdminSideJudge/AddJudges/AddJudgeMain";
import CreateScoreCard from "./AuthSide/AdminSideJudge/CreateScoreCard";
import Links from "./AuthSide/AdminSideJudge/Links";
import UploadVideo from "./AuthSide/AdminSideJudge/UploadVideo";
import AdminOperator from "./AuthSide/AdminSideJudge/AdminOperator";


export default function Router() {
    let element = useRoutes([
        {
            path: '/',
            element: <Landing />,
        },
        {
            path: '/admin',
            element: <AdminHome />,
            children: [
                {
                    path: 'welcome',
                    element: <Welcome />,
                },
                {
                    path: 'add-event',
                    element: <AddEvent />,
                },

            ]
        },
{
            path: 'add-judges',
            element: <AddJudgeMain />,
        },

        {
            path: 'create-score-card',
            element: <CreateScoreCard/>
        },
        {
            path: 'links',
            element: <Links/>
        },
        {
            path: 'upload-file',
            element: <UploadVideo/>
        },
        {
            path: 'admin-operator',
            element: <AdminOperator/>
        },


    ])
    return element
}