import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  background: '#37373c',
  marginBottom: '20px',
  display: 'flex',
  borderRadius: '8px',
  justifyContent: 'space-between',
  padding: '16px 24px',
  alignItems: 'center',
  width: '100%',
  maxWidth: '215px',

  [theme.breakpoints.down(767)]: {
    marginBottom: '10px',
    padding: '8px 15px',
    maxWidth: '100%',
  },

  '.address-text': {
    fontSize: '16px',
    fontWeight: '500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [theme.breakpoints.down(767)]: {
      fontSize: '12px',
    },
  },

  '.copy-btn': {
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
