import { styled } from "@mui/material";

import FlexBox from "../../Common/FlexBox";

export const Container = styled("div")(({ isOpen, theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "55px",
  alignItems: "center",
  justifyItems: "flex-start",
  [theme.breakpoints.down(1430)]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down(1050)]: {
    gridTemplateColumns: !isOpen ? "repeat(2, 1fr)" : "1fr",
  },
  [theme.breakpoints.down(800)]: {
    gridTemplateColumns: "1fr",
  },

  ".time-pending": {
    [theme.breakpoints.down(767)]: {
      fontSize: "19px",
    },
  },
}));

export const OuterRing = styled(FlexBox)`
  margin-right: 15px;
  justify-content: center;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: conic-gradient(
    from 90deg at 50% 50%,
    rgba(0, 175, 170, 0.0001) 0deg,
    #1677ff 359.96deg,
    rgba(0, 175, 170, 0.0001) 360deg
  );
  transform: rotate(-90deg);
`;

export const InnerRing = styled(FlexBox)`
  justify-content: center;
  width: 58px;
  height: 58px;
  border-radius:50%;
  background: #37373c;
  transform: rotate(90deg);
`;

export const MainCard = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  minWidth: "100%",
  width: "100%",
  padding: "24px 30px",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "10px",
  [theme.breakpoints.down(1680)]: {
    // padding: '20px',

    ".MuiTypography-h5": {
      fontSize: "16px",
    },
  },
  [theme.breakpoints.down(800)]: {
    width: "100%",
  },
}));

export const SecondaryCard = styled(FlexBox)(({ theme }) => ({
  width: "100%",
  maxWidth: 175,
  justifyContent: "start",
  fontSize: "12px",
  padding: "18px 20px",
  background: theme.palette.primary.dark,
  borderRadius: "10px",
}));
