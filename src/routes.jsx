import { useRoutes, Navigate } from "react-router";
import Landing from "./page/landing/Landing";
import AdminHome from "./AuthSide/AdminSide1";
import Welcome from "./AuthSide/AdminSide1/Welcome";
import AddEvent from "./AuthSide/AdminSide1/AddEvent";
import AddJudgeMain from "./AuthSide/AdminSideJudge/AddJudges/AddJudgeMain";
import CreateScoreCard from "./AuthSide/AdminSideJudge/CreateScoreCard";
import Links from "./AuthSide/AdminSideJudge/Links";
import UploadVideo from "./AuthSide/AdminSideJudge/UploadVideo";
import AdminOperator from "./AuthSide/AdminSideJudge/AdminOperator";

import AddContent from "./AuthSide/AdminSide1/AddContest";
import AddRegistration from "./AuthSide/AdminSide1/RegistrationTime";
import AddParticipant from "./AuthSide/AdminSide1/AddParticipant";
import QrCode from "./AuthSide/AdminSide1/QrCode";
import SignUpForm from "./AuthSide/AdminSide1/SignUpForm";
import AdminSideScreen from "./AuthSide/AdminSideJudge/AdminSideScreen/AdminSideScreen";
import AdminSideScreen2 from "./AuthSide/AdminSideJudge/AdminSideScreen/AdminSideScreen2";
import AdminOperator2 from "./AuthSide/AdminSideJudge/AdminOperator2";
import AdminOperator3 from "./AuthSide/AdminSideJudge/AdminOperator3";
import IframeLink from "./AuthSide/AdminSideJudge/IframeLink";
import ParticipantPage from "./AuthSide/AdminSideJudge/ParticipantPage";
import AllRecords from "./AuthSide/AdminSideJudge/AllRecords";

import AllRecord from "./AuthSide/AdminSideJudge/AdminSideScreen/AllRecord";
import JugedRole from "./AuthSide/AdminSideJudge/AdminSideScreen/JugedRole";
import JudgePanelReg from "./AuthSide/JudgePanel/JudgePanelReg";
import JudgePanelReg2 from "./AuthSide/JudgePanel/JudgePanelReg2";
import JudgeAllParticepent from "./AuthSide/JudgePanel/JudgeAllParticepent";
import JudgeAdminPanelParticipant from "./AuthSide/JudgePanel/JudgeAdminPanelParticipant";
import LoginAdminPanel from "./AuthSide/JudgePanel/LoginAdminPanel";
export default function Router() {
    let element = useRoutes([
        {
            path: '/',
            element: <Navigate to="/admin/welcome" replace />,
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
                {
                    path: 'add-content',
                    element: <AddContent />,
                },
                {
                    path: 'add-registration',
                    element: <AddRegistration />,
                },
                {
                    path: 'add-participant',
                    element: <AddParticipant />,
                },
                {
                    path: 'add-QR',
                    element: <QrCode />,
                },
                {
                    path: 'signUp',
                    element: <SignUpForm />,
                },

            ]
        },
        {
            path: 'add-judges',
            element: <AddJudgeMain />,
        },
        {
            path: 'create-score-card',
            element: <CreateScoreCard />
        },
        {
            path: 'links',
            element: <Links />
        },
        {
            path: 'upload-file',
            element: <UploadVideo />
        },
        {
            path: 'admin-operator',
            element: <AdminOperator />
        },
        {
            path: 'admin_side_screen1',
            element: <AdminSideScreen />,
        },
        {
            path: 'admin_side_screen2',
            element: <AdminSideScreen2 />,
        },
            {
            path: 'admin-operator2',
            element: <AdminOperator2 />
        },
        {
            path: 'admin-operator3',
            element: <AdminOperator3 />
        },
        {
            path: 'iframe',
            element: <IframeLink />
        },
        {
            path: 'participant-page',
            element: <ParticipantPage />
        },
        {
            path: 'all-records',
            element: <AllRecords />
        },
        {
            path: 'all_record',
            element: <AllRecord />,
        },
        {
            path: 'judge_role',
            element: <JugedRole />,
        },
        {
            path: 'judge_panel_screen1',
            element: <JudgePanelReg />,
        },
        {
            path: 'judge_panel_screen2',
            element: <JudgePanelReg2 />,
        },
        {
            path: 'judge_all_particeipent',
            element: <JudgeAllParticepent />,
        },
        {
            path: 'judge_admin_panel_participant',
            element: <JudgeAdminPanelParticipant />,
        },
        {
            path: 'login_admin_panel_participant',
            element: <LoginAdminPanel />,
        },
    ]);
    return element;
}
