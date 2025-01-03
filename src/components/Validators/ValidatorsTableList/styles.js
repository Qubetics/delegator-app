import {
  Paper,
  styled,
  Checkbox,
  Pagination as MuiPagination,
} from "@mui/material";
import style from "styled-components";
import FlexBox from "../../Common/FlexBox";
export const Buttoncontainer = style.div`
button{
  background: #0086ff;
  color: #fff;
  border: 0;
  padding: 12px 37px;
  border-radius: 10px;
  opacity: 1;
  font-size:18px;
  @media (max-width: 767px) {
    padding: 12px;

  }
}
.disable{
  background:#0086ff;
  opacity:0.7;
}

`;

export const TabsSection = styled(FlexBox)(({ theme }) => ({
  gap: "20px",
  justifyContent: "space-between",
  margin: "20px 0 35px",
  [theme.breakpoints.down(1324)]: {
    flexDirection: "column",
    alignItems: "end",
  },
  ".MuiTabs-flexContainer": {
    gap: "20px",
  },
  ".MuiTab-root": {
    height: "41px",
    padding: "10px 18px",
    background: "rgba(18, 18, 18, 1)",
    borderRadius: "44px",
    color: "rgba(160, 160, 160, 1)",
    fontSize: "16px",
    fontWeight: "500",
  },
  "MuiTab-root": {
    background: "rgba(18, 18, 18, 1) !important",
  },
  ".MuiTab-root.Mui-selected": {
    borderRadius: "44px",
    padding: "10px 18px",

    // fontSize: "14px",
    // fontWeight: "500",
    color: "#fff",
    textDecoration: "none",
    transition: "all 0.2s linear",
    height: "41px",
    color: "rgb(255, 255, 255)",
    cursor: " pointer",
    border: "2px solid transparent",
    background:
      "linear-gradient(180deg, #000, #000) padding-box, conic-gradient(from 180deg at 50% 50%, #ff98e2, #ffc876 35.77deg, #79fff7 153.75deg, #9f53ff 258.75deg, #ff98e2 360deg) border-box",
    borderRadius: "25px",
    transition: "color 0.2s ease-out, filter 0.2s ease-out",
    textAlign: "center",
  },
  ".MuiTabs-indicator": {
    display: "none",
  },
  ".searchfield ": {
    height: "46px",
    background: "#121212",
    color: "#A0A0A0",
    border: "1px solid #3B393C",
    borderRadius: "20px",
    "button": {
      display: "none",
    }
  },
}));

export const Search = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: "550px",
  borderRadius: "10px !important",
  boxShadow: "none",
  background: "rgba(18, 18, 18, 1)!important",
  color: "#A0A0A0",
  border: "1px solid #3B393C",
  borderRadius: "14px",
  ".MuiInputBase-root:hover": {
    borderColor: "transparent !important",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent !important",
    },
  },
  button: {
    height: "40px",
    marginRight: "10px",
    width: "100%",
    maxWidth: "110px",
    borderRadius: "28px",
    border: "2px solid transparent",
    color: "#fff",
    background:
      "linear-gradient(180deg, #000, #000) padding-box, conic-gradient(from 180deg at 50% 50%, #ff98e2, #ffc876 35.77deg, #79fff7 153.75deg, #9f53ff 258.75deg, #ff98e2 360deg) border-box !important",
  },
  // [theme.breakpoints.down(1440)]: {
  //   maxWidth: "350px",
  // },
  // [theme.breakpoints.down(767)]: {
  //   maxWidth: "100%",
  //   padding: "10px 15px",
  // },

  ".MuiInputBase-root": {
    marginLeft: 0,

    ".MuiInputBase-input": {
      color: theme.palette.text.white,
      fontSize: "16px",
    },
    ".MuiInputBase-input::placeholder": {
      // opacity: '1',
      color: "#fff",
    },
  },

  [theme.breakpoints.down(1324)]: {
    width: "100%",
    marginTop: 15,
  },
}));

export const StyledCheckbox = styled(Checkbox)(() => ({
  "&.Mui-checked": {
    color: "#90CAF9;",
  },
}));

export const ToggleWrap = styled(Paper)(({ theme }) => ({
  padding: "16px 30px",
  textAlign: "right",
  fontSize: "16px",
  fontWeight: "600",
  [theme.breakpoints.down(767)]: {
    fontSize: "12px",
  },
}));

export const Pagination = styled(MuiPagination)(({ theme }) => ({
  marginLeft: "auto"
  ,
  width: "100%",
  ".MuiPagination-ul": {
    background: "transparent",
  },
  ".MuiPaginationItem-previousNext": {
    border: "0",
  },
  ".MuiPaginationItem-root": {
    border: "0px !important",
    color: "rgba(160, 160, 160, 1)",
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
