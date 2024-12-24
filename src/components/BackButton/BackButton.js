/*eslint-disable*/
import BackIcon from '../../assets/Icons/BackIcon';
import { Button } from '@mui/material';

const BackButton = ({ onClick }) => {
  return (
    <Button variant="outlined" onClick={onClick} className="back-btns">
      Back
    </Button>
  );
};

export default BackButton;
