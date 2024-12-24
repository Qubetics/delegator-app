import { Paper, Typography } from '@mui/material';
import { Image } from './styles';
import NotFoundImg from '../../assets/Images/no-transaction.svg';

const NotFound = () => {
  return (
    <Paper>
      <div className="not-found">
        <Image src={NotFoundImg} alt="Not Found" />
        <Typography className="not-found__text" color="text.secondary">
          Data Not Found
        </Typography>
      </div>
    </Paper>
  );
};

export default NotFound;
