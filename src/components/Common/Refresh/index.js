import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles(() => ({
  refresh: {
    marginTop: '10px',
    cursor: 'pointer',
    margin: 'auto',
    '&.spin': {
      animation: '$spin 1s 1',
      pointerEvents: 'none',
    },
  },
  long_content: {
    maxWidth: '80px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis !important',
    overflow: 'hidden',
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));
