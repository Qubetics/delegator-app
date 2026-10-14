import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";
import StyledComponent from "styled-components";

export const StyledLink = StyledComponent(Link)`
color: yellow;
`;

export const Wrapper = styled(Box)(({ theme }) => ({
    width: " 100%",
    marginBottom: " 40px",
    maxWidth: "1400px",
    margin: "auto",
    "h3": {
        margin: "40px 0px 30px 0px"
    }
}));