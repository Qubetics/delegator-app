import { Box, Container as BaseContainer, styled } from "@mui/material";

export const Wrapper = styled(Box)(({ theme }) => ({
  width: " 100%",
  marginBottom: " 40px",
  maxWidth: "1400px",
  margin: "auto",
  ".arrow_container": {
    display: "flex",
    gap: "9px",
    alignItems: "center",
    h3: {
      fontSize: "28px",
      fontWeight: "700",
    },
  },
  ".namesherlock": {
    margin: "20px 0px",
    display: "flex",
    gap: "30px",
    p: {
      fontSize: "20px",
      fontWeight: "400",
    },
  },
  ".flex-itemssheloc": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    button: {
      border: " 2px solid transparent",
      background:
        "linear-gradient(180deg, #000, #000) padding-box, conic-gradient(from 180deg at 50% 50%, #ff98e2, #ffc876 35.77deg, #79fff7 153.75deg, #9f53ff 258.75deg, #ff98e2 360deg) border-box",
      borderRadius: "25px",
      transition: "color 0.2s ease-out, filter 0.2s ease-out",
      "&:hover": {
        background:
          "linear-gradient(180deg, #000, #000) padding-box, conic-gradient(from 180deg at 50% 50%, #ff98e2, #ffc876 35.77deg, #79fff7 153.75deg, #9f53ff 258.75deg, #ff98e2 360deg) border-box",
        borderRadius: "25px",
      },
    },
  },
  ".address_container": {
    p: {
      fontSize: "14px",
      fontWeight: "400",
      color: "#fff",
      marginBottom: "13px",
    },
    ">div": {
      background: " #121212",
      maxWidth: "440px",
      width: "100%",
      height: "56px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "17px 16px",
      borderRadius: "7px",
      svg: {
        cursor: "pointer",
      },
      p: {
        fontSize: "16px",
        fontWeight: "400",
        color: "#fff",
        marginBottom: "13px",
      },
    },
  },
  ".listing_details": {
    borderRadius: "20px",
    padding: "30px",
    marginTop: "40px",
    border: "1px solid rgba(59, 57, 60, 1)",

    ul: {
      padding: "0px",
      listStyle: "none",
      margin: "0px",
      li: {
        display: "flex",
        gap: "80px",
        height: "50px",
        alignItems: "center",
        [theme.breakpoints.down(767)]: {
          justifyContent: "space-between",
        },
        " p": {
          margin: "0px",
          fontSize: "16px",
          fontWeight: "400",
        },
        ".firstchild": {
          maxWidth: "260px",
          color: "rgba(160, 160, 160, 1)",
          fontSize: "16px",
          fontWeight: "300",
          width: "100%",
        },
      },
    },
  },
}));
