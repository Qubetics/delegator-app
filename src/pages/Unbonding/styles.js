import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import StyledComponent from "styled-components";
import { TableCell, Button } from "@mui/material";

export const StyledLink = StyledComponent(Link)`
color: yellow;
`;

export const Wrapper = styled(Box)(({ theme }) => ({
  maxWidth: "1400px",
  width: "100%",
  margin: "auto",
  "common-table": {
    width: "100%",
    h3: {
      a: {
        height: "40px",
        fontWeight: "700",
        color: "rgb(255, 255, 255)",
        cursor: " pointer",
        border: "2px solid transparent",
        background:
          "linear - gradient(180deg, var(--bg), var(--bg)) padding - box, conic - gradient(from 180deg at 50 % 50 %, #ff98e2, #ffc876 35.77deg, #79fff7 153.75deg, #9f53ff 258.75deg, #ff98e2 360deg) border - box",
        borderRadius: "25px",
        transition: "color 0.2s ease - out, filter 0.2s ease - out",
      },
    },
  },
  ".copyicon svg ": {
    marginLeft: "3px",
    "g path": {},
  },
}));

export const brder_comm = styled(Box)(({ theme }) => ({}));




export const StyledTableCell = styled(TableCell)(() => ({
  color: "#fff",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  fontSize: "14px",
  padding: "18px 16px",
}));

export const StyledHeaderCell = styled(StyledTableCell)(() => ({
  fontWeight: 600,
  fontSize: "14px",
  color: "#bbb",
  textTransform: "uppercase",
}));

export const CancelButton = styled(Button)(() => ({
  background: "#2a1c1c",
  border: "1px solid #a33a3a",
  color: "#ff4d4f",
  fontSize: "13px",
  fontWeight: 500,
  textTransform: "none",
  padding: "7px 18px !important",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  "&:hover": { 
    background: "#ff4d4f", 
    color: "#fff" 
  },
  "&::before": { 
    content: '"unset !important"', 
    display: "none !important" 
  },
}));

export const CopyButton = styled("span")(() => ({
  marginLeft: "8px",
  cursor: "pointer",
  color: "#bbb",
  fontSize: "13px",
  display: "inline-flex",
  alignItems: "center",
  "&:hover": { color: "#fff" },
}));

export const Avatar = styled("div")(() => ({
  width: 34,
  height: 34,
  borderRadius: "50%",
  background: "#2d2d2d",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "13px",
  fontWeight: 600,
  marginRight: 10,
  color: "#fff",
}));
