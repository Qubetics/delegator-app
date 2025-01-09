import { styled, Box } from "@mui/material";

export const Wrapper = styled(Box)(({ theme }) => ({
  ".common-wrapper": {
    maxWidth: "600px",
    margin: "0 auto",
    borderRadius: "22px",
    padding: "37px 30px",
    position: "relative",
    borderRadius: "10px",
    border: "1px solid hsla(0,0%,100%,.1)",
    marginTop: "30px",
    background: "rgba(18, 18, 18, 1)",
    backdropFilter: " blur(32px)",
    [theme.breakpoints.down(1440)]: {
      padding: "25px 20px",
    },

    "&__amount": {
      position: "relative",

      ".maxBtn": {
        position: "absolute",
        top: "43px",
        right: "15px",
        // backgroundColor: '#191919',
        background: "rgba(18, 18, 18, 1)!important",
        minWidth: "109px",
        fontSize: "14px !important",
        borderRadius: "25px !important",
        fontWeight: "600 !important",
        "&.MuiButton-root": {
          padding: "7px 15px",
          fontSize: "13px",
          fontWeight: "400",
          borderRadius: "8px",
          textTransform: "uppercase",
        },
      },
    },

    "button": {
      // border: "2px solid transparent",
      background: "linear-gradient(180deg, #000, #000) padding-box, conic-gradient(from 180deg at 50% 50%, #ff98e2, #ffc876 35.77deg, #79fff7 153.75deg, #9f53ff 258.75deg, #ff98e2 360deg) border-box !important",
      borderRadius: "25px",
      transition: "color 0.2s ease-out, filter 0.2s ease-out",
    },

    "&__title": {
      marginBottom: "20px",
      paddingBottom: "20px",
      fontSize: "24px",
      fontWeight: "600",
      textAlign: "center",
      "span": {
        color: "#fff !important",
      },


      [theme.breakpoints.down(1440)]: {
        fontSize: "18px",
      },
      [theme.breakpoints.down(767)]: {
        fontSize: "15px",
        marginBottom: "10px",
        paddingBottom: "20px",
      },

      "&--flex": {
        paddingBottom: "20px",
        display: "flex",
        alignItems: "center",

        [theme.breakpoints.down(1440)]: {
          gap: "20px 0",
          flexDirection: "column",
          alignItems: "start",
        },

        ".addres-input": {
          marginLeft: "50px",
          marginBottom: "0",

          [theme.breakpoints.down(1440)]: {
            marginLeft: "0px",
          },
          [theme.breakpoints.down(767)]: {
            maxWidth: "100%",
          },
        },
      },
    },
    ".currencytitle": {
      fontSize: "14px",
      fontWeight: "400",
      textAlign: "left",
      color: "rgb(160, 160, 160) ",
    },
    "&__subText": {
      fontSize: "18px",
      display: "block",
      marginTop: "15px",
      color: theme.palette.text.secondary,
      [theme.breakpoints.down(1440)]: {
        fontSize: "14px",
        marginTop: "7px",
      },
    },

    "&__infoBox": {
      display: "flex",
      alignItems: "end",
      justifyContent: "space-between ",
      gap: "20px 60px",
      margin: "30px 0",
      [theme.breakpoints.down(1440)]: {
        flexWrap: "wrap",
      },
    },
    "&__bottomBox": {
      "&__title": {
        marginBottom: "5px",
        fontSize: "16px",
        [theme.breakpoints.down(1440)]: {
          fontSize: "13px",
        },
      },
      "&__subtitle": {
        fontSize: "1.3rem",
        fontWeight: "700",
        [theme.breakpoints.down(1440)]: {
          fontSize: "1.2rem",
        },

        "&--flex": {
          display: "flex",
          alignItems: "end",
        },
        span: {
          display: "inline-block",
          marginBottom: "-5px",
          marginLeft: "15px",
          color: theme.palette.blue.main,
          background: theme.palette.blue.lightBlue,
          borderRadius: "6px",
          padding: "5px 15px",
          fontSize: "12px",
          [theme.breakpoints.down(1440)]: {
            fontSize: "9px",
          },
        },
      },
    },

    ".genrate-key": {
      position: "relative",

      "&__btns": {
        "&.MuiButton-root": {
          position: "absolute",
          top: "42px",
          right: "8px",
          maxWidth: "200px",
          fontSize: "16px",
          fontWeight: "500",
          padding: "8px 24px",
          [theme.breakpoints.down(767)]: {
            position: "static",
            marginBottom: "20px",
          },
        },
      },
    },

    ".MuiFormHelperText-root": {
      marginBottom: "12px",
    },
    ".MuiButton-root": {
      fontSize: "16px",
      fontWeight: "500",
      maxWidth: "100%",
      textTransform: "capitalize",
      padding: "10px",
      background: "#1677ff",
      color: "#fff",

      [theme.breakpoints.down(1440)]: {
        fontSize: "16px",
        padding: "10px",
      },
      [theme.breakpoints.down(767)]: {
        maxWidth: "100%",
      },
    },

    "&__top-content": {

      flex: "1 0",
      [theme.breakpoints.down(1440)]: {
        gap: "20px",
      },

      "&:first-of-type": {
        marginRight: "30px",
        [theme.breakpoints.down(1440)]: {
          marginRight: "0",
        },
        [theme.breakpoints.down(467)]: {
          flexDirection: "column",
        },
      },
    },

    ".back-btns": {
      background: "transparent !important",
      position: "absolute",
      fontSize: "13px",
      padding: "0px",
      top: "28px",
      left: "10px",
      height: "40px",
      [theme.breakpoints.down(1439)]: {
        top: "15px",
        padding: "12px 30px",
      },
      [theme.breakpoints.down(575)]: {
        padding: "9px 20px",
      },
      "svg": {
        fill: "#fff !important"
      }
    },
  },
}));
