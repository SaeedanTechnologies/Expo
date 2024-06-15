import { useRoutes } from "react-router";
import Landing from "./page/landing/Landing";
import AdminHome from "./AuthSide/AdminSide1";
import Welcome from "./AuthSide/AdminSide1/Welcome"
import AddEvent from "./AuthSide/AdminSide1/AddEvent";
import AddContent from "./AuthSide/AdminSide1/AddContest";
import AddRegistration from "./AuthSide/AdminSide1/RegistrationTime";
import AddParticipant from "./AuthSide/AdminSide1/AddParticipant";
import QrCode from "./AuthSide/AdminSide1/QrCode";
import SignUpForm from "./AuthSide/AdminSide1/SignUpForm";

export default function Router() {
    let element = useRoutes([

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



    ])
    return element
}