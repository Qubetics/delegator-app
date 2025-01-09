/*eslint-disable*/
import {
  Button,
  styled,
  Typography,
  Pagination as MuiPagination,
} from "@mui/material";

import { MainCard } from "../../components/Common/Card/styles";


export const Container = styled(MainCard)(({ theme }) => ({
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  width: "100%",
  marginBottom: "0px",
  padding: "0 !important",
  background: "transparent",
  ".dashTitle_btn": {
    backdropFilter: "blur(32px)",
    margin: "40px 0px 0px 0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "centre",
    width: '100%',
    "h3": {
      lineHeight: "36px",
    },
    "> button": {
      height: "40px",
      borderRadius: "25px",
    },
  },
  ".validator-status": {
    width: "100%",
    marginTop: "35px",
    paddingBottom: "30px",
    marginBottom: "30px",
    borderRadius: "22px",

    "&.mb-0": {
      marginBottom: "0",
    },
    "&__card": {
      padding: "25px 30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: "0px",
      // borderBottom: '1px solid #000',

      [theme.breakpoints.down(767)]: {
        padding: "15px",
      },
      [theme.breakpoints.down(467)]: {
        flexDirection: "column",
        gap: "10px 0",
        alignItems: "flex-start"
      },

      ".MuiTypography-root": {
        fontSize: "22px",
        fontWeight: "700",
        [theme.breakpoints.down(767)]: {
          fontSize: "16px",
        },
      },
    },
    ".MuiTableContainer-root": {
      border: "1px solid hsla(0,0%, 100%, .1)",
      borderRadius: "14px!important",
      marginTop: "20px",
    },
    "td, th": {
      "p": {
        fontSize: "18px!important",
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
