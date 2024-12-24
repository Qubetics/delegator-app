import { styled } from '@mui/material';
import FlexBox from '../FlexBox';

export const MainCard = styled(FlexBox)(({ theme }) => ({
  justifyContent: 'space-between',
  minWidth: '100%',
  width: '100%',
  padding: '24px 30px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '10px',
  [theme.breakpoints.down(1680)]: {
    '.MuiTypography-h5': {
      fontSize: '16px',
    },
  },
  [theme.breakpoints.down(800)]: {
    width: '100%',
  },
}));

export const SecondaryCard = styled(FlexBox)(({ theme }) => ({
  width: '100%',
  maxWidth: 175,
  justifyContent: 'start',
  fontSize: '12px',
  padding: '18px 20px',
  background: theme.palette.primary.dark,
  borderRadius: '10px',
}));
