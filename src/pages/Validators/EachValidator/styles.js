import { styled, Box } from '@mui/material';

export const ValidatorDetailsHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '26px 50px 28px 23px',
  gap: '20px',
  flexWrap: 'wrap',
});

export const ValidatorDetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '6px 48px 6px 22px',
  borderTop: `1px solid ${theme.palette.divider}`,

  '>:first-of-type': {
    fontWeight: 700,
  },
  [theme.breakpoints.down(410)]: {
    flexDirection: 'column',
    gap: '20px',
  },
}));
