import { styled, Box } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
  alignItems: 'end',
  maxWidth: "1440px",
  width: "100%",
  margin: "auto",
  marginTop: "50px",

  [theme.breakpoints.down('767')]: {
    paddingBottom: '25px',
  },

  img: {
    maxWidth: '100px',
    maxHeight: '100px',
    borderRadius: '10px',
  },

  '.MuiTypography-body1': {
    fontWeight: '600',
  },
  '.addres-input': {
    marginBottom: '0',
    maxWidth: '428px',
    marginLeft: '50px',

    [theme.breakpoints.down(574)]: {
      marginLeft: '0',
    },
    "svg": {
      marginLeft: "5px",
    },
  },

  '.MuiBox-root': {
    [theme.breakpoints.down(574)]: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: '12px',
    },
  },
}));
