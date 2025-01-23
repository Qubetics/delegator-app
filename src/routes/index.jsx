/*eslint-disable*/
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPanel from "../components/MainPanel";
import WalletActivites from "../components/RecentActivites/WalletActivites";
import Redelegate from "../pages/Funds/Redelegate/index.js";
import PrivateRouter from "./PrivateRouter";

const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const BlocksPage = lazy(() => import("../pages/Blocks"));
const Validators = lazy(() => import("../pages/Validators"));
const Bond = lazy(() => import("../pages/Funds/Bond/index.jsx"));
const UnBond = lazy(() => import("../pages/Funds/UnBond/index.jsx"));
const ValidatorDetails = lazy(() => import("../pages/Validators/EachValidator"));
const Delegate = lazy(() => import("../pages/Validators/Delegate/index.jsx"));
const NotFound = lazy(() => import("../pages/NotFound"));

const RoutePath = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <MainPanel>
      <Suspense fallback>
        <Routes>
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" replace />} />
          <Route path="/blocks" element={<BlocksPage />} />
          <Route path="/validators" element={<Validators />} />
          <Route
            path="/validators/:address"
            element={
              <PrivateRouter>
                <ValidatorDetails />
              </PrivateRouter>
            }
          />
          <Route
            path="/validators/delegate"
            element={
              <PrivateRouter>
                <Delegate />
              </PrivateRouter>
            }
          />
          <Route
            path="/funds/bond"
            element={
              <PrivateRouter>
                <Bond />
              </PrivateRouter>
            }
          />
          <Route
            path="/funds/unbond"
            element={
              <PrivateRouter>
                <UnBond />
              </PrivateRouter>
            }
          />
          <Route
            path="/funds/redelegate"
            element={
              <PrivateRouter>
                <Redelegate />
              </PrivateRouter>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRouter>
                <Dashboard />
              </PrivateRouter>
            }
          />
          <Route
            path="/wallet-activites"
            element={
              <PrivateRouter>
                <WalletActivites />
              </PrivateRouter>
            }
          />
          <Route path="/not-found" element={<NotFound />} />

          {/* <Route path="*" element={<Navigate to="/blocks" replace />} />
          <Route path="/" element={<Navigate to="/blocks" replace />} /> */}
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </MainPanel>
  );
};

export default RoutePath;
