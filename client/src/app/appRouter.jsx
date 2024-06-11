import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthPage from "../pages/AuthPage";
import WithAuth from "../hoc/WithAuth";
import LotDetailsPage from "../components/LotDetails";
import CreateLotPage from "../components/CreateLotPage";
import CompletedTradesPage from "../components/CompletedTrades";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<WithAuth element={<App />} />
    ,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/registration",
    element: <AuthPage />,
  },
  {
    path:"/lot/:lotId",
    element : <WithAuth element={<LotDetailsPage />}/>
  },
  {
    path:"/create-lot",
    element : <WithAuth element={<CreateLotPage />}/>
  },
  {
    path:"/completedTrades",
    element : <WithAuth element={<CompletedTradesPage />}/>
  },
]);
