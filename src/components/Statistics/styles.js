import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import StyledComponent from "styled-components";

export const StyledLink = StyledComponent(Link)`
color: yellow;
`;

export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "30px",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "40px",
  maxWidth: "1400px",
  margin: "auto",
  paddingTop: "17px",
  ".cardbg": {
    background: "linear-gradient(157.79deg, rgba(29, 29, 29, 0.54) -0.65%, rgba(29, 29, 29, 0.9) 99.59%)",
    backdropFilter: " blur(64px)",
    "h6": {
      color: "rgba(160, 160, 160, 1)",
      fontSize: "16px",
      fontWeight: "300",
    },
    "h4": {
      fontSize: "20px",
      fontWeight: "400",
      margin: "0px",
    },
  },
  [theme.breakpoints.down(1680)]: {
    ".MuiTypography-h4": {
      fontSize: "18px",
    },
    ".MuiTypography-h6 ": {
      fontSize: "13px",
    },
  },
  [theme.breakpoints.down(1440)]: {
    gap: "15px",
  },
  [theme.breakpoints.down(575)]: {
    marginTop: "10px",
  },

  ".icon-wrap": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "58px",
    height: "58px",
    borderRadius: "10px",
    flexShrink: "0",
    border: "1px solid rgba(69, 69, 69, 1)",
    borderRadius: "40px",
    background: "rgba(22, 22, 22, 1)",
    svg: {
      width: "25px",
      height: "25px",
    },

    [theme.breakpoints.down(1680)]: {
      width: "50px",
      height: "50px",
      // background: "#515152",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },

    // "&.firstbg": {
    //   background: "#FE6BBA33",
    // },
    "&.secondbg": {
      svg: {
        height: "30px",
      },
    },
    "&.icon-large": {
      ".MuiSvgIcon-fontSizeMedium": {
        fontSize: "34px",
      },
    },
  },

  ".supply-wrap": {
    display: "flex",
  },

  ".total-supply": {
    maxWidth: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export const StatItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flex: "auto",
  background:
    "linear-gradient(to bottom right, rgb(31, 31, 35), rgb(37, 42, 45))",
  borderRadius: "14px",
  padding: "28px",
  border: "1px solid hsla(0,0%,100%,.1)",
  [theme.breakpoints.down(767)]: {
    width: "100%",
  },
  ".MuiSvgIcon-root": {
    fontSize: "25px",
    fill: "transparent",
    flexShrink: "0",
  },
  [theme.breakpoints.down(1680)]: {
    padding: "20px",

    ".MuiSvgIcon-root": {
      fontSize: "18px",
    },
  },
}));


export const Search = styled(Box)(({ theme }) => ({
  maxWidth: "685px",
  width: "100%",
  ".MuiFormControl-root": {
    background: "#121212",
    color: "#A0A0A0",
    border: "1px solid #3B393C",
    borderRadius: "14px",
    marginBottom: "40px",
  },
  "fieldset": {
    border: "transparent",
  },
}));
