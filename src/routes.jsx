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
import AdminRegisterForm from "./AuthSide/AdminSide1/AdminRegisterForm";
import AdminLoginForm from "./AuthSide/AdminSide1/AdminLoginForm";
import ParticipantRegistered from "./AuthSide/AdminSide1/ParticipantRegistered";
import PublicScreen from "./AuthSide/AdminSideJudge/PublicScreen";
import Stripe from "./Stripe";
export default function Router() {


    let element = useRoutes([
        {
            path: '/',
            element: <Navigate to="/admin-login" replace />,
        },
        {
            path: '/paypal',
            element: <Stripe />,
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
                    path: 'contest/:id',
                    element: <SignUpForm />,
                },

            ]
        },
        {
            path: 'participant-registered',
            element: <ParticipantRegistered />,
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
            path: 'upload-file/:id',
            element: <UploadVideo />
        },
        {
            path: 'admin-contest-start/:id',
            element: <AdminOperator />
        },
        {
            path: 'admin_side_screen1',
            element: <AdminSideScreen />,
        },
        {
            path: 'public-screen-result/:id',
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
            path: 'participant-page/:id',
            element: <ParticipantPage />
        },
        {
            path: 'public-screen/:id',
            element: <PublicScreen />
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
            path: 'judge-score-card/:id',
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
            path: 'judge-login',
            element: <LoginAdminPanel />,
        },
        {
            path: 'admin-sign-up',
            element: <AdminRegisterForm />,
        },
        {
            path: 'admin-login',
            element: <AdminLoginForm />,
        },
    ]);
    return element;
}
