import { styled } from "@mui/system";
import { Box } from "@mui/material";

// export const FooterContainer = styled(Box)(({ theme }) => ({
//
//   color: "#FFFFFF",
//   padding: "40px 20px",
//   position: "relative",
//   [theme.breakpoints.down("sm")]: {
//     padding: "20px 10px",
//   },
// }));
export const FooterItem = styled(Box)(({ theme }) => ({
  background:
    "linear-gradient(180deg, rgba(13, 13, 13, 0) -43.17%, #0D0D0D 100%)",
  padding: "0 20px",
  marginTop: "111px",
  [theme.breakpoints.down("sm")]: {
    padding: "0 10px",
  },
}));
export const FooterItemInner = styled(Box)(({ theme }) => ({
  maxWidth: "1440px",
  margin: "0 auto",
  padding: "40px 20px 26px 20px",
  [theme.breakpoints.down("sm")]: {
    padding: "0 10px",
  },
}));
export const FooterSection = styled(Box)(({ theme }) => ({
  textAlign: "left",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
  "& h6": {
    fontSize: "18px",
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: "24px",
    whiteSpace: "noWrap",
  },
  "& a": {
    fontSize: "14px",
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.6)",
    display: "block",
    paddingBottom: "2px",
    textDecoration: "none",
    transition: "margin-left 0.3s ease-in-out",
    ":hover": {
      marginLeft: "10px",
    },
  },
  "& p": {
    fontSize: "16px",
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.6)",
    maxWidth: "358px",
  },
}));

export const SocialLinks = styled(Box)(({ theme }) => ({
  marginTop: "20px",
  "& h6": {
    textAlign: "center",
    fontWeight: "700",
    paddingTop: "90px",
    paddingBottom: "7px",
  },
}));

export const SocialLinksInner = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "8px",
  paddingBottom: "42px",

  "& a": {
    color: "#FFFFFF",
    fontSize: "24px",
    textDecoration: "none",
  },
}));

export const Copyright = styled(Box)(({ theme }) => ({
  paddingTop: "18px",
  textAlign: "center",
  fontSize: "14px",
  borderTop: "1px solid rgba(255, 255, 255, 0.2)",
}));
