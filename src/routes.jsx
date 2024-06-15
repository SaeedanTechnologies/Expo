import { useRoutes } from "react-router";
import Landing from "./page/landing/Landing";
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