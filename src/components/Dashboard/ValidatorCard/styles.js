import { Button, styled, Typography, Pagination as MuiPagination } from "@mui/material";

import { MainCard } from "../../../components/Common/Card/styles";
export const Container = styled(MainCard)(({ theme }) => ({
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
  // marginBottom: "30px",
  padding: "0 !important",
  background: "transparent",

  ".validator-status": {
    width: "100%",
    paddingBottom: "20px",
    // marginBottom: "30px",
    borderRadius: "22px",

    "&.mb-0": {
      marginBottom: "0",
    },
    "th": {
      "span": {
        fontSize: "18px!important",
      },
    },
    "&__card": {
      padding: "5px 0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      [theme.breakpoints.down(767)]: {
        padding: "15px",
      },
      [theme.breakpoints.down(480)]: {
        padding: "2px",
        paddingBottom: "15px",
        alignItems: "baseline",
        flexDirection: "column",
        gap: "10px 0",
      },

      ".MuiTypography-root": {
        fontSize: "22px",
        fontWeight: "700",
        [theme.breakpoints.down(767)]: {
          fontSize: "16px",
        },
      },
      ".status-filed": {
        display: "flex",
      },

      button: {
        border: "2px solid transparent",
        background: "linear-gradient(180deg, #000, #000) padding-box, conic-gradient(from 180deg at 50% 50%, #ff98e2, #ffc876 35.77deg, #79fff7 153.75deg, #9f53ff 258.75deg, #ff98e2 360deg) border-box",
        borderRadius: "25px",
        transition: "color 0.2s ease-out, filter 0.2s ease-out",
        "&:hover": {
          background: "linear-gradient(180deg, #000, #000) padding-box, conic-gradient(from 180deg at 50% 50%, #ff98e2, #ffc876 35.77deg, #79fff7 153.75deg, #9f53ff 258.75deg, #ff98e2 360deg) border-box",
        },
      },
    },
    ".MuiPaper-root": {
      border: "1px solid hsla(0,0%,100%,.1)",
      borderRadius: "14px !important",
      marginTop: "30px",
      background: "rgba(18, 18, 18, 1)",
      "th": {
        "span": {
          fontSize: "18px!important",
        },
      },
      "td": {
        "p": {
          fontSize: "18px!important",
        },
      },
      "p": {
        color: "rgba(160, 160, 160, 1)",
        "svg": {
          marginLeft: "4px",

        },
        "svg g path": {
          // fill: "rgba(160, 160, 160, 1)",
        },
      },
    },
  },
  ".recent-action": {
    ".title": {
      padding: "30px",
      fontSize: "20px",
      fontWeight: "700",
      [theme.breakpoints.down(767)]: {
        padding: "15px",
        fontSize: "16px",
      },
    },

    ".no-data": {
      width: "100%",
      margin: "0",
      textAlign: "center",
    },
  },
}));

export const ValidatorButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.blue.main,
  color: theme.palette.text.primary,
  textTransform: "capitalize",

  "&:hover": {
    backgroundColor: theme.palette.blue.main,
    opacity: 0.7,
  },
}));

export const ActionStatus = styled(Typography)(({ status, theme }) => ({
  color: status?.toLowerCase() === "completed" ? theme.palette.green.main : status?.toLowerCase() === "processing" ? theme.palette.orange.main : theme.palette.text.primary,
}));

export const Pagination = styled(MuiPagination)(({ theme }) => ({
  marginLeft: "auto",
  ".MuiPagination-ul": {
    background: "transparent",

  },
  ".MuiPaginationItem-previousNext": {
    // background: " rgba(18, 18, 18, 1)",
    border: " 0",
    borderRadius: "8px",
  },
  ".MuiPaginationItem-root": {
    color: "rgba(160, 160, 160, 1)",
    border: "0px !important",
    "&:hover": {
      color: "rgba(160, 160, 160, 1)",
    },
  },
  ".MuiPaginationItem-root.Mui-selected": {
    background: " rgba(18, 18, 18, 1)",
    border: " 1px solid rgba(59, 57, 60, 1)",
    borderRadius: "8px",
    color: "#fff",
  },
  ".MuiPaginationItem-root.Mui-disabled": {
    opacity: "1",
  },
}));
export const clipboard_icon = {
  display: "inline-block",
  verticalAlign: "middle",
  width: "14px",
  margin: "0 10px",
  cursor: "pointer",
};
