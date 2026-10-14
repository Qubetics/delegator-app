import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { MINIMUM_BOND_AMOUNT } from '../Common/Constant';

const CommonModal = ({ open, setOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          sx={{
            color: 'black',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            padding: '1rem',
          }}
        >
          Message{' '}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            The available balance is less than the minimum required amount i.e. {MINIMUM_BOND_AMOUNT},
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
            sx={{ width: '100%', margin: '1rem' }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CommonModal;
