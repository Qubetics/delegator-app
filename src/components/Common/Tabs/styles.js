import { Box, Tabs, Tab, styled } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(1324)]: {
    width: "100%",
  },
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  ".disabled": {
    cursor: "not-allowed",
  },
  minHeight: "fit-content",
  "& .MuiTabs-scroller": {
    "& .MuiTabs-flexContainer": {
      minWidth: 428,

    },
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.blue.main,
    },
    [theme.breakpoints.down(664)]: {
      overflow: "auto !important",
      "& .MuiTabs-indicator": {
        background: "none",
      },
    },
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  ".disabled": {
    cursor: "not-allowed",
  },
  minWidth: "fit-content",
  minHeight: "fit-content",
  padding: "17px 30px",
  color: theme.palette.text.secondary,
  textTransform: "capitalize",
  letterSpacing: "normal",
  fontWeight: 500,
  fontSize: theme.typography.subtitle1.fontSize,
  lineHeight: "24px",
  "&.Mui-selected": {
    color: theme.palette.text.primary,
  },
  "&:last-child": {
    marginRight: 0,
  },
  [theme.breakpoints.down(1400)]: {
    padding: "10px 25px",
  },
}));
