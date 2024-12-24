import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  '.copy-address__icon': {
    background: 'transparent',
    border: '0',
    padding: '0',
    cursor: 'pointer',
    marginLeft: '10px',

    [theme.breakpoints.down(767)]: {
      svg: {
        fontSize: '16px',
      },
    },
  },
}));
