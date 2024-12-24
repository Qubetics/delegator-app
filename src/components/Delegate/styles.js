import { styled, Box, InputLabel, Select, MenuItem } from "@mui/material";

export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "24px",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },

  img: {
    maxWidth: "100px",
    maxHeight: "100px",
    borderRadius: "50%",
  },
}));

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  padding: "12px 24px",
  backgroundColor: "#2B4379",
  borderRadius: "8px",

  "& .MuiFormLabel-root": {
    color: theme.palette.text.primary,
  },
  "&.MuiInputBase-root": {
    "& #validator-select": {
      padding: "0 10px 0 0",
      fontSize: theme.typography.subtitle1.fontSize,
      fontWeight: 500,
    },
    "&.MuiOutlinedInput-notchedOutline": {
      borderColor: "#2B4379",
    },

    "&::hover": {
      outline: "0",
      border: "0",
    },
  },
}));

export const MenuProps = () => {
  return {
    background: "#08132C",
    borderRadius: "6px",
    minWidth: "120px !important",
  };
};

export const StyledMenuItem = styled(MenuItem)(() => ({
  fontSize: "12px",
  lineHeight: "18px",
  color: "#fff",
  "&:hover": {
    background: "#0071FF !important",
  },
}));

export const SetupWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  maxWidth: "1440px",
  width: "100%",
  margin: "30px auto",
  ".setup-wrap": {
    background: theme.palette.primary.main,
    borderRadius: "22px",

    "&__title": {
      padding: "20px 30px",
      fontWeight: "500",
      fontSize: "18px",
      lineHeight: "24px",
      borderRadius: "22px 22px 0 0",
      background: theme.palette.secondary.dark,

      "&--flex": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    },

    "&__content": {
      padding: "15px 30px 30px",

      "&--flex": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    },
  },
}));
