import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthPage from "../pages/AuthPage";
import WithAuth from "../hoc/WithAuth";
import LotDetailsPage from "../components/LotDetails";
import CreateLotPage from "../components/CreateLotPage";
import CompletedTradesPage from "../components/CompletedTrades";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WithAuth element={<Layout />} />, 
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "lot/:lotId",
        element: <LotDetailsPage />,
      },
      {
        path: "create-lot",
        element: <CreateLotPage />,
      },
      {
        path: "completedTrades",
        element: <CompletedTradesPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/registration",
    element: <AuthPage />,
  },
]);