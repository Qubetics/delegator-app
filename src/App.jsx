/*eslint-disable*/
import { useEffect } from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { BrowserRouter } from "react-router-dom";
import RoutePath from "./routes";
import AppLogout from "./components/SessionExpired";
import { useClearCache } from "react-clear-cache";

function App() {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();

  if (!isLatestVersion) {
    emptyCacheStorage();
  }

  return (
    <BrowserRouter>
      <RoutePath />
      <AppLogout />
      <NotificationContainer />
    </BrowserRouter>
  );
}

export default App;
