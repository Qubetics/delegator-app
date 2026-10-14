/*eslint-disable*/
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/Reducer/auth';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from '../toast/Toast';
import { useIdleTimer } from 'react-idle-timer';

const AppLogout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginValue = useSelector((state) => state.auth.isLoggedIn);

  const logoutAction = () => {
    if (loginValue) {
      dispatch(logout());
      toast.error('Session Expired, Please login again !!!');
      navigate('/login');
    }
  };

  const onIdle = () => {
    logoutAction();

  };

  const onActive = () => {
    reset(loginValue);
  };
  const { reset } = useIdleTimer({
    onIdle,
    onActive,
    timeout: 600000,
    throttle: 1000,
  });
  return <div>{children}</div>;
};

export default AppLogout;