import { Menu as MuiMenu } from '@mui/material';

const Menu = ({ children, ...props }) => {
  return (
    <MuiMenu
      PaperProps={{
        style: {
          width: 155,
        },
      }}
      {...props}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: (theme) => theme.palette.primary.dark,
        },
        '& .MuiMenu-list': {
          paddingTop: '0px',
          paddingBottom: '0px',
          '& :hover': {
            backgroundColor: (theme) => `${theme.palette.blue.main} !important`,
          },
        },
        '& .MuiMenuItem-root': {
          padding: '12px 24px',
        },
      }}
    >
      {children}
    </MuiMenu>
  );
};

export default Menu;
