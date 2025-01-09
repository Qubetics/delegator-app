import { TextField, styled } from "@mui/material";

export const CustomizedTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  label: {
    width: "100%",
    position: "static",
    color: `${theme.palette.text.primary} !important`,
    ...theme.typography.label,
    transform: "none !important",
    marginBottom: "12px",
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: `0 !important`,

    top: "0px",
    padding: "0px",

    fieldset: {
      display: "none",
    },
    legend: {
      display: "none",
    },
  },
  ".MuiOutlinedInput-input": {
    padding: "15px 24px",
    height: "auto",
    // background: `${theme.palette.primary.main}`,
    borderRadius: "5px",
    padding: "15px 14px",
    color: "rgb(255, 255, 255)",
    background: "rgba(8, 8, 8, 1)",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    textOverflow: "ellipsis",
  },
  ".MuiOutlinedInput-input::placeholder": {
    opacity: "0.3",
    color: `#fff`,
  },
  ".MuiFormHelperText-root": {
    marginTop: "10px",
    marginLeft: "0px",
    fontSize: "14px",
    fontWeight: "600",
    color: theme.palette.blue.main,
    [theme.breakpoints.down(767)]: {
      fontSize: "12px",
      lineHeight: "15px",
    },
  },
}));
