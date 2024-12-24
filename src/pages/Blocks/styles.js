import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import StyledComponent from "styled-components";

export const StyledLink = StyledComponent(Link)`
color: yellow;
`;

export const Wrapper = styled(Box)(({ theme }) => ({
    maxWidth: "1400px",
    width: "100%",
    margin: "auto",
    "common-table": {
        width: "100%",
        "h3": {
            "a": {
                height: "40px",
                fontWeight: "700",
                color: "rgb(255, 255, 255)",
                cursor: " pointer",
                border: '2px solid transparent',
                background: "linear - gradient(180deg, var(--bg), var(--bg)) padding - box, conic - gradient(from 180deg at 50 % 50 %, #ff98e2, #ffc876 35.77deg, #79fff7 153.75deg, #9f53ff 258.75deg, #ff98e2 360deg) border - box",
                borderRadius: "25px",
                transition: "color 0.2s ease - out, filter 0.2s ease - out",
            },
        },

    },

}));

export const brder_comm = styled(Box)(({ theme }) => ({

}));