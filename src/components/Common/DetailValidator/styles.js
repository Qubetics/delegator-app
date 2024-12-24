import { styled, Box, InputLabel, Select, MenuItem } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',

  [theme.breakpoints.down('sm')]: {
    flexWrap: 'wrap',
  },

  img: {
    maxWidth: '100px',
    maxHeight: '100px',
    borderRadius: '10px',
  },
}));

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: '#2B4379',
  borderRadius: '8px',

  svg: {
    position: 'absolute',
    zIndex: '0',
    color: '#FFFFFF',
  },

  '& .MuiFormLabel-root': {
    color: theme.palette.text.primary,
  },
  '&.MuiInputBase-root': {
    '& #validator-select': {
      padding: '0 40px 0 0',
      fontSize: theme.typography.subtitle1.fontSize,
      fontWeight: 500,
      zIndex: 1,
    },
    '&.MuiOutlinedInput-notchedOutline': {
      borderColor: '#2B4379',
    },
  },
}));

export const MenuProps = () => {
  return {
    background: '#08132C',
    borderRadius: '6px',
    minWidth: '120px !important',
  };
};

export const StyledMenuItem = styled(MenuItem)(() => ({
  fontSize: '12px',
  lineHeight: '18px',
  color: '#fff',
  '&:hover': {
    background: '#0071FF !important',
  },
}));
