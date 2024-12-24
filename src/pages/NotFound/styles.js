import { styled } from '@mui/material';
import FormWrapper from '../../components/Common/FormWrapper';

export const Container = styled(FormWrapper)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Image = styled('img')(({ theme }) => ({
  width: 'auto',
  height: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: 260,
  },
}));
