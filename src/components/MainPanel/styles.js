import { Box, Container as BaseContainer, styled } from "@mui/material";

export const Wrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  // background: theme.palette.primary.dark,
  position: "relative",

  ".MuiTableCell-root": {
    borderBottom: "1px solid rgba(255, 255, 255, 0.045)",
    whiteSpace: "nowrap",
    padding: "16px 28px",
    [theme.breakpoints.down(767)]: {
      padding: "10px 20px",
    },
  },
  ".MuiTableHead-root": {
    // background: "#37373c",
    ".MuiTableCell-root": {
      borderBottom: "none",
      padding: "22px 28px",
      color: theme.palette.text.secondary,

      [theme.breakpoints.down(767)]: {
        padding: "10px 20px",
        fontSize: "13px",

        ".MuiTypography-label": {
          fontSize: "13px",
        },
        ".MuiTypography-body1": {
          fontSize: "13px",
        },
      },
    },
  },
  ".MuiTableBody-root": {
    background: "transparent",

    [theme.breakpoints.down(767)]: {
      ".MuiTypography-body2": {
        fontSize: "13px",
      },
    },
  },

  ".MuiContainer-root": {
    maxWidth: "100%",
    width: "100% !important",
    margin: "0 0 0 auto",
    // background: "#181919",

    [theme.breakpoints.down(1440)]: {
      // width: "78% !important",
    },

    [theme.breakpoints.down(999)]: {
      width: "100% !important",
    },
  },
  ".MuiTableContainer-root": {
    background: theme.palette.primary.main,
    borderRadius: "5px",

    // borderRadius: '20px',
  },
  ".MuiPaper-root": {
    background: "transparent",
    // borderRadius: '4px',
    // border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  ".MuiButton-root": {
    padding: "12px 31px",
    borderRadius: "15px",
    fontSize: "16px",
    fontWeight: "500",
    boxShadow: "none",
    letterSpacing: "normal",

    [theme.breakpoints.down(767)]: {
      padding: "7px 25px",
      fontSize: "13px",
      borderRadius: "10px",
    },
  },
  ".MuiButton-outlined": {
    fontWeight: "500",
    border: "1.5 px solid",
    border: "2px solid transparent",
    background: "linear-gradient(180deg, #000, #000) padding-box, conic-gradient(from 180deg at 50% 50%, #ff98e2, #ffc876 35.77deg, #79fff7 153.75deg, #9f53ff 258.75deg, #ff98e2 360deg) border-box",
    transition: " color 0.2s ease-out, filter 0.2s ease-out",
    color: "#fff",

    "&:hover": {
      border: "2px solid transparent",
      background: "linear-gradient(180deg, #000, #000) padding-box, conic-gradient(from 180deg at 50% 50%, #ff98e2, #ffc876 35.77deg, #79fff7 153.75deg, #9f53ff 258.75deg, #ff98e2 360deg) border-box",
      transition: " color 0.2s ease-out, filter 0.2s ease-out",
      background: "linear-gradient(180deg, #000, #000) padding-box, conic-gradient(from 180deg at 50% 50%, #ff98e2, #ffc876 35.77deg, #79fff7 153.75deg, #9f53ff 258.75deg, #ff98e2 360deg) border-box",
    },
    "&.Mui-disabled": {
      border: "1.5 px solid",
      borderColor: "#29292977",
      backgroundColor: "#29292977",
      color: "#f9f9f977",
      pointerEvents: "all",
      cursor: "not-allowed !important",
    },
  },
  ".MuiButton-contained": {
    background: "#0086ff",
    textTransform: "capitalize",
    "&:hover": {
      opacity: "0.7",
      background: "#0086ff",
    },

    "&.dark-btn": {
      background: theme.palette.secondary.dark,
      color: "#787A8D",
    },

    "&.Mui-disabled": {
      backgroundColor: "#292929",
      color: "#f9f9f9",
      pointerEvents: "all",
      cursor: "not-allowed !important",

      "&:hover": {
        opacity: "1",
      },
    },
  },
  ".bg_content": {
    minHeight: "calc(100vh - 612px)",
  },

  ".main_top": {
    [theme.breakpoints.down("991")]: {
      ">div": {
        "&:first-child": {
          display: "none",
        },
      },
    },
  },
}));

export const Container = styled(BaseContainer)(({ theme }) => ({
  maxWidth: "100% !important",
  // width: ismobile === 'true' ? 'calc(100% - 60px)' : 'calc(100% - 400px)',
  // margin: ismobile === 'true' ? '30px' : '65px 60px 65px 30px',
  // marginLeft: '335px',
  padding: "35px 30px",
  [theme.breakpoints.down(991)]: {
    padding: "65px 30px",
  },
  [theme.breakpoints.down(575)]: {
    padding: "65px 20px",
  },

  // [theme.breakpoints.down(1680)]: {
  //   width: ismobile === 'true' ? 'calc(100% - 60px)' : 'calc(100% - 385px)',
  // },
  [theme.breakpoints.down(1440)]: {
    // margin: ismobile === 'true' ? '60px 30px 30px' : '45px',
    // marginLeft: '300px',
  },
  ".topLogoutbtn": {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
  },
  ".open-icon": {
    position: "absolute",
    top: "20px",
  },

  // '.MuiTableCell-body': {
  //   padding: '16px 30px',

  //   '.MuiTypography-body1': {
  //     padding: '10px 20px',
  //   },
  // },

  ".block-table": {
    ".MuiTableCell-head": {
      // '&:first-of-type': {
      //   paddingLeft: '98px',
      //   [theme.breakpoints.down(767)]: {
      //     paddingLeft: '85px',
      //   },
      // },
    },

    ".MuiTableCell-body": {
      padding: "16px 28px",
      [theme.breakpoints.down(767)]: {
        padding: "10px 20px",
      },
    },
  },

  ".validator-table": {
    // '.MuiTableCell-head': {
    //   paddingLeft: '16px',
    //   paddingright: '16px',
    // },
  },

  ".custom-divider": {
    margin: "20px 0 15px",
    borderColor: "#3B393C",
  },

  ".primary-btn": {
    borderRadius: "15px",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "24px",
    padding: "20px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    height: "55px",
    color: "#fff",
    border: "2px solid transparent",
    background: `linear-gradient(180deg, var(--bg), var(--bg)) padding-box,
      conic-gradient(
        from 180deg at 50% 50%,
        #ff98e2,
        #ffc876 35.77deg,
        #79fff7 153.75deg,
        #9f53ff 258.75deg,
        #ff98e2 360deg
      ) border-box`,
    borderRadius: "25px",
    transition: "color 0.2s ease-out, filter 0.2s ease-out",
    "--bg": "#000",
    "--hover-bg": "var(--theme-gradients-main)",
    "--text": "#fff",
    "--hover-text": "#000",
    svg: {
      path: {
        fill: "#fff",
        transition: "all 0.25s linear",
      },
    },
    "&:hover": {
      opacity: "0.8",
    },

    [theme.breakpoints.down(767)]: {
      fontSize: "16px",
      padding: "12px",
    },
  },
  ".outline-btn": {
    borderRadius: "15px",
    fontWeight: "500",
    fontSize: "20px",
    lineHeight: "24px",
    padding: "20px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.25s linear",
    background: "rgba(52, 108, 222, 0.2)",
    border: "1px solid",
    color: theme.palette.blue.main,
    borderColor: theme.palette.blue.main,

    svg: {
      path: {
        transition: "all 0.25s linear",
      },
    },
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: theme.palette.text.primary,
      color: theme.palette.text.primary,

      svg: {
        path: {
          transition: "all 0.25s linear",
          fill: theme.palette.text.primary,
        },
      },
    },
    [theme.breakpoints.down(767)]: {
      fontSize: "16px",
      padding: "12px",
    },
  },

  ".common-table": {
    // background: theme.palette.primary.main,
    borderRadius: "22px",
    paddingBottom: "35px",

    h3: {
      fontSize: "22px",
      padding: "30px 0",
      paddingTop: "37px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.down(767)]: {
        fontSize: "16px",
        padding: "20px",
      },
    },
    ".view-all": {
      lineHeight: "16px",
      display: "block",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "500",
      color: "#fff",
      textDecoration: "none",
      transition: "all 0.2s linear",
      height: "41px",
      color: "rgb(255, 255, 255)",
      cursor: " pointer",
      // border: "2px solid transparent",
      background: "linear-gradient(180deg, #000, #000) padding-box, conic-gradient(from 180deg at 50% 50%, #ff98e2, #ffc876 35.77deg, #79fff7 153.75deg, #9f53ff 258.75deg, #ff98e2 360deg) border-box",
      borderRadius: "25px",
      transition: "color 0.2s ease-out, filter 0.2s ease-out",
      minWidth: "123px",
      textAlign: "center",
    },
    brder_comm: {
      border: "1px solid rgba(59, 57, 60, 1)!important",
      p: { color: "#fff" },
    },
    ".MuiPaper-root": {
      border: "1px solid rgba(59, 57, 60, 1)",
      overflow: "scroll",
      borderRadius: "10px",
      background: " rgba(18, 18, 18, 1)",
      p: {
        fontSize: "15px",
        color: "rgba(160, 160, 160, 1)",
        "span": {
          fontSize: "16px",
          fontWeight: "300",

        }
      },
      th: {
        p: {
          fontWeight: "600",
          color: "#fff",
        },
      },
    },
  },

  ".auth-wrapper": {
    marginTop: "50px",
    ".addres-input": {
      maxWidth: "fit-content",
      marginBottom: "0",
    },
    "&__inner": {
      padding: "40px 30px",
      maxWidth: "500px",
      width: "100%",
      margin: "0 auto",
      border: "1px solid rgba(59, 57, 60, 1)",
      borderRadius: "14px",
      background: "rgba(18, 18, 18, 1)",
      backdropFilter: "blur(32px)",
      [theme.breakpoints.down(1440)]: {
        paddingTop: "50px",
      },

      h3: {
        marginBottom: "35px",
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "600",
      },
      ".MuiOutlinedInput-input": {
        background: "rgba(8, 8, 8, 1)",
        border: "0",
      },
    },

    "&__backbtn": {
      textAlign: "right",
    },
    "&__btns": {
      display: "flex",
      gap: "0 30px",
      paddingTop: "50px",
      [theme.breakpoints.down(767)]: {
        flexDirection: "column",
        gap: "15px 0",
      },

      ".btnlogin": {
        // flex: "1",
        width: "174px",
        margin: "auto",
        height: "50px",
        fontSize: "18px",
        fontWeight: "600",
        display: "block",
      },

      ".outline-btn": {
        flex: "1",
      },
    },
  },

  ".btn-icon": {
    display: "inline-block",
    marginRight: "15px",
    lineHeight: "0",
  },

  ".id-wrap": {
    display: "flex",
    alignItems: "center",

    "&__icon": {
      width: "36px",
      height: "36px",
      borderRadius: "8px",
      marginRight: "25px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // background: "#515152",
      // border: "1px solid rgba(255, 255, 255, 0.1)",
      fontWeight: "700",
      fontSize: "17px",
      color: "rgba(160, 160, 160, 1)",

      [theme.breakpoints.down(767)]: {
        width: "35px",
        height: "35px",
        fontSize: "16px",
      },

      "&--mr-0": {
        marginRight: 0,
      },
    },
  },

  ".vaildator-card": {
    height: "100%",
    position: "relative",
    background: " linear-gradient(157.79deg, rgba(29, 29, 29, 0.54)-0.65 %, rgba(29, 29, 29, 0.9) 99.59%)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    "&__main": {
      display: "flex",
      alignItems: "center",
      marginRight: "15px",
    },

    "&__icon": {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      width: "58px",
      height: "58px",
      borderRadius: "10px",
      background: " rgba(22, 22, 22, 1)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      marginRight: "20px",
      flexShrink: "0",
      [theme.breakpoints.down(1680)]: {
        width: "45px",
        height: "45px",
        background: " rgba(22, 22, 22, 1)",

        border: "1px solid rgba(255, 255, 255, 0.1)",
      },

      svg: {
        width: "28px",
        height: "28px",

        [theme.breakpoints.down(1680)]: {
          width: "18px",
          height: "18px",
        },
      },
    },
    "&__tooltip": {
      position: "absolute",
      top: "-2px",
      right: "-2px",

      ".MuiSvgIcon-fontSizeMedium": {
        fontSize: "18px",
      },
    },
  },

  ".not-found": {
    textAlign: "center",
    padding: "15px",

    img: {
      width: "90px",
      height: "90px",
      marginBottom: "0px",
      [theme.breakpoints.down(767)]: {
        width: "100px",
        height: "100px",
      },
    },

    " &__text": {
      fontSize: "16px",
      color: "rgba(160, 160, 160, 1)",
    },
  },

  [theme.breakpoints.down(767)]: {
    ".MuiTypography-h3": {
      fontSize: "18px",
      marginBottom: "10px",
    },
    ".MuiTypography-body1": {
      fontSize: "15px",
    },
  },

  ".back-btn": {
    all: "unset",
    cursor: "pointer",
    opacity: "1",
    transition: "all linear 0.25s",

    "&:hover": {
      opacity: "0.7",
    },
  },
  ".profile-wrap": {
    maxWidth: "1400px",
    margin: "0px auto",
    "&__item": {
      display: "flex",
      alignItems: "center",
      padding: "40px 0 20px 0",
      gap: "10px",
      minHeight: "92px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.045)",
      [theme.breakpoints.down(485)]: {
        flexDirection: "column",
        alignItems: "flex-start",
        minHeight: "40px",
        // marginTop: "15px",
      },
      [theme.breakpoints.down(991)]: {
        padding: "28px 0",
      },

      span: {
        wordBreak: "break-all",
      },
      ".MuiTypography-body1": {
        fontWeight: "600",
        textTransform: "capitalize",
        flex: "0 120px",
        [theme.breakpoints.down(767)]: {
          flex: "0 45px",
        },
        "&.address-text": {
          flex: 1,
        },
      },

      "&--status": {
        [theme.breakpoints.down(767)]: {
          alignItems: "start",
          flexDirection: "column",
          gap: "15px 0",
        },

        ".MuiButton-contained": {
          maxWidth: "280px",
          [theme.breakpoints.down(767)]: {
            maxWidth: "100%",
          },
        },
      },

      ".addres-input": {
        marginBottom: "0",
        maxWidth: "fit-content",
        background: "linear-gradient(157.79deg, rgba(29, 29, 29, 0.54) -0.65%, rgba(29, 29, 29, 0.9) 99.59%)",
        [theme.breakpoints.down(767)]: {
          // maxWidth: "200px",
        },
      },
      ".status-wrap": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: "1",
      },
      ".walletadd": {
        minWidth: "107px",
      },
    },
    "&--detail": {
      marginTop: "-40px",
    },
  },

  ".table-wrap": {
    position: "relative",
    overflow: "hidden",
    background: "rgba(18, 18, 18, 1)",
    border: " 1px solid rgba(59, 57, 60, 1)",
    borderRadius: "20px",
    ".nominate-btns": {
      position: "absolute",
      top: "-65px",
      right: "0",
    },

    ".MuiTableBody-root": {
      p: {
        color: "rgba(160, 160, 160, 1)",
        " svg g": {
          // path: {
          //   fill: "rgba(160, 160, 160, 1)",
          // },
        },
      },
      ".MuiTableRow-root": {
        "&:hover": {
          background: "linear-gradient(157.79deg, rgba(29, 29, 29, 0.54) -0.65%, rgba(29, 29, 29, 0.9) 99.59%)",
        },
      },
    },
    "th": {
      " span": {
        fontSize: "18px",
        fontWeight: "300"
      }
    },
    "td": {
      " p, span": {
        fontSize: "18px",
        fontWeight: "300"
      }
    }
  },
  //bond button colors//
  // '.bonds-btns': {
  //   padding: '7px 20px',
  //   border: '1px solid',
  //   borderRadius: '8px',
  //   margin: '0 5px',
  //   textDecoration: 'none',
  //   fontSize: '13px',
  //   display: 'inline-block',
  //   transition: 'all linear 0.25s',
  //   color: '#fff',
  //   fontWeight: '700 !important',
  //   '&.btn-yellow': {
  //     borderColor: '#e69b00',
  //     // color: '#F9B959',
  //     color: 'black',
  //     backgroundColor: '#e69b00',

  //     '&:hover': {
  //       color: '#fff',
  //       backgroundColor: '#F9B95977',
  //     },
  //   },
  //   '&.btn-green': {
  //     borderColor: 'green',
  //     // color: '#1AD598',
  //     backgroundColor: 'green',
  //     '&:hover': {
  //       backgroundColor: '#1AD59877',
  //     },
  //   },
  //   '&.btn-red': {
  //     borderColor: 'red',
  //     // color: '#ED0800',
  //     backgroundColor: 'red',
  //     '&:hover': {
  //       backgroundColor: '#ED080077',
  //     },
  //   },
  // },
  // '.status-active': {
  //   color: 'green !important',
  // },
  // '.status-inactive': {
  //   color: 'red !important',
  // },
  // '.status-waiting': {
  //   color: 'yellow !important',
  // },
  //closed//
  //bond button colors//

  ".bonds-btns": {
    padding: "7px 20px",
    border: "1px solid",
    borderRadius: "8px",
    margin: "0 5px",
    textDecoration: "none",
    fontSize: "13px",
    textTransform: "uppercase",
    display: "inline-block",
    transition: "all linear 0.25s",
    borderRadius: "25px",
    "&.btn-yellow": {
      border: "1px solid var(--Colors-Yellow, rgba(255, 204, 0, 1))",
      color: " var(--Colors-Yellow, rgba(255, 204, 0, 1))",
      backgroundColor: "#000",


      "&:hover": {
        backgroundColor: "#F9B95933",
      },
    },
    "&.btn-green": {
      borderColor: "#1AD598",
      color: "#1AD598",
      backgroundColor: "#1AD59822",
      "&:hover": {
        backgroundColor: "#1AD59833",
      },
    },
    "&.btn-red": {
      border: "1px solid var(--Colors-Red,rgba(255, 59, 48, 1))",
      color: " var(--Colors-Red,rgba(255, 59, 48, 1))",
      background: "#000",

      "&:hover": {
        backgroundColor: "#ED080033",
      },
    },
    "&.btn-blue": {
      border: "1px solid rgba(255, 255, 255, 1)",
      background: "#000",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#f4f6fa33",
      },
    },
    "&.disable": {
      cursor: "not-allowed",
      opacity: "0.5",
    },
  },
  ".status-active": {
    color: "#1AD598 !important",
  },
  ".status-inactive": {
    color: "#ED0800 !important",
  },
  ".status-waiting": {
    color: "#F9B959 !important",
  },

  //closed

  ".tooltip-common": {
    textAlign: "center",
    ".MuiSvgIcon-fontSizeMedium": {
      fontSize: "12px",
    },
  },

  ".validator-detail": {
    position: "relative",
    margin: "15px 0",

    "&__btns": {
      position: "absolute",
      right: "15px",
      bottom: "30px",
      [theme.breakpoints.down(1199)]: {
        position: "static",
        marginTop: "10px",
      },
    },
  },

  ".text-hover": {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "grey",
    transition: "all 0.15s linear",
    "&:hover": {
      color: "#68afef",
    },
  },
  ".copy-address": {
    display: "flex",
    alignItems: "center",
    "&__text": {
      width: "150px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "&__icon": {
      display: "inline-block",
      top: "4px",
      position: "relative",
      marginLeft: "5px",
    },
  },

  ".content-wrap": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px 30px",

    [theme.breakpoints.down(1440)]: {
      padding: "0 20px 20px",
    },
    [theme.breakpoints.down(574)]: {
      padding: "0 15px 15px",
    },
  },

  ".p-0": {
    padding: "0 !important",
  },

  ".lockList": {
    listStyle: "none",
    paddingLeft: "5px",
    li: {
      display: "flex",
      alignItems: "center",
      span: {
        display: "inline-block",
        minWidth: "20px",
        marginRight: "8px",
        button: {
          padding: "0",
        },

        ".commn-icon": {
          marginRight: "0",
        },
      },
    },
  },

  ".flex-center": {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
export const TableContainer = styled(Box)(({ theme }) => ({
  border: "1px solid rgba(59, 57, 60, 1)",
  p: { color: "#fff" },
}));
