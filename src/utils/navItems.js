import BlocksIcon from "../assets/Icons/BlocksIcon";
import LoginIcon from "../assets/Icons/LoginIcon";
import ValidatorIcon from "../assets/Icons/ValidatorIcon";
import DashboardIcon from "../assets/Icons/DashboardIcon";

export const notLoggedInRoutes = [
  {
    path: "/login",
    Icon: LoginIcon,
    label: "Log In",
  },
  {
    path: "/blocks",
    Icon: BlocksIcon,
    label: "Blocks",
  },
  {
    path: "/validators",
    Icon: ValidatorIcon,
    label: "Validators",
  },
];

export const loggedInRoutes = [
  {
    path: "/dashboard",
    Icon: DashboardIcon,
    label: "Dashboard",
  },
  {
    path: "/blocks",
    Icon: BlocksIcon,
    label: "Blocks",
  },
  {
    path: "/validators",
    Icon: ValidatorIcon,
    label: "Validators",
  },
];
