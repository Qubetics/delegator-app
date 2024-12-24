import { styled } from '@mui/material';
import { Link as BaseLink } from 'react-router-dom';

export const Link = styled(BaseLink)(({ theme }) => ({
  color: `${theme.palette.blue.main} !important`,
  textAlign: 'center',
  display: 'block',
}));
