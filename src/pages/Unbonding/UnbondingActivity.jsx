/* eslint-disable */
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CopyIcon } from "../../assets/Icons/SvgIcon";
import { Wrapper } from "./styles";

// ===== Styles =====
const StyledTableCell = styled(TableCell)(() => ({
  color: "#fff",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  fontSize: "14px",
  padding: "18px 16px",
}));

const StyledHeaderCell = styled(StyledTableCell)(() => ({
  fontWeight: 600,
  fontSize: "14px",
  color: "#bbb",
  textTransform: "uppercase",
}));


const CancelButton = styled(Button)(() => ({
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
  "&:hover": { background: "#ff4d4f", color: "#fff" },
  "&::before": { content: '"unset !important"', display: "none !important" },
}));

const CopyButton = styled("span")(() => ({
  marginLeft: "8px",
  cursor: "pointer",
  color: "#bbb",
  fontSize: "13px",
  display: "inline-flex",
  alignItems: "center",
  "&:hover": {
    color: "#fff",
  },
}));

const ProgressBar = styled(LinearProgress)(() => ({
  height: 6,
  borderRadius: 4,
  marginTop: 6,
  backgroundColor: "#2a2a2a",
  "& .MuiLinearProgress-bar": {
    backgroundColor: "#666",
  },
}));

const Avatar = styled("div")(() => ({
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

// ===== Sample Data (created date only) =====
const unbondingData = [
  {
    validator: "QubeCore",
    address: "0xc6a6...6805",
    amount: "15.0000 TICS",
    createdAt: "2025-08-25T15:30:00", // starting date
  },
  {
    validator: "ArcNode Labs",
    address: "0x73e4...42AA",
    amount: "7.0400 TICS",
    createdAt: "2025-08-20T18:00:00",
  },
  {
    validator: "Helix Staking",
    address: "0x5bd1...e8F9",
    amount: "42.0000 TICS",
    createdAt: "2025-08-10T11:30:00",
  },
];

const TOTAL_DURATION = 14 * 24 * 60 * 60 * 1000; // 14 days in ms

// Format countdown
const formatCountdown = (ms) => {
  if (ms <= 0) return "Completed";
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const UnbondingActivity = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const updateCountdowns = () => {
      const now = Date.now();

      const updated = unbondingData.map((row) => {
        const start = new Date(row.createdAt).getTime();
        const end = start + TOTAL_DURATION;

        const remaining = end - now;
        const elapsed = now - start;

        const progress =
          elapsed <= 0
            ? 0
            : elapsed >= TOTAL_DURATION
            ? 100
            : (elapsed / TOTAL_DURATION) * 100;

        return {
          ...row,
          eta: new Date(end).toLocaleString(),
          countdown: formatCountdown(remaining),
          progress,
          disableCancel: remaining <= 0,
        };
      });

      setRows(updated);
    };

    updateCountdowns();

    const timer = setInterval(updateCountdowns, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    alert("Address Copied!");
  };

  return (
    <div>
      <Typography
        variant="h6"
        sx={{ color: "#fff", mb: 1, fontSize: "20px", fontWeight: 600 }}
      >
        Unbonding Activity
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "#888", mb: 3, fontSize: "14px" }}
      >
        Track ongoing unbond requests per validator. You can cancel any pending
        unbond before it completes.
      </Typography>

      <Wrapper>
        <div className="common-table">
          <TableContainer component={Paper}>
            <Table aria-label="unbonding table">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell>VALIDATOR NAME</StyledHeaderCell>
                  <StyledHeaderCell>VALIDATOR ADDRESS</StyledHeaderCell>
                  <StyledHeaderCell>UNBOND AMOUNT</StyledHeaderCell>
                  <StyledHeaderCell>COUNTDOWN / ETA</StyledHeaderCell>
                  <StyledHeaderCell>ACTION</StyledHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    {/* Validator Name */}
                    <StyledTableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar>
                          {row.validator.slice(0, 2).toUpperCase()}
                        </Avatar>
                        <div>
                          <div style={{ fontWeight: 500 }}>{row.validator}</div>
                          <Typography
                            variant="caption"
                            sx={{ color: "#888", fontSize: "12px" }}
                          >
                            Active unbond
                          </Typography>
                        </div>
                      </div>
                    </StyledTableCell>

                    {/* Validator Address */}
                    <StyledTableCell>
                      <div className="dFlex">
                        {row.address}
                        <CopyButton
                          onClick={() => copyToClipboard(row.address)}
                        >
                          <CopyIcon sx={{ fontSize: "17px" }} />
                        </CopyButton>
                      </div>
                    </StyledTableCell>

                    <StyledTableCell>{row.amount}</StyledTableCell>

                    <StyledTableCell>
                      <div>{row.eta}</div>
                      <div
                        style={{
                          color: "#999",
                          fontSize: "13px",
                          marginTop: 2,
                        }}
                      >
                        {row.countdown}
                      </div>
                      <ProgressBar variant="determinate" value={row.progress} />
                    </StyledTableCell>

                    {/* Action */}
                    <StyledTableCell>
                      {row.disableCancel ? ("Unbond Completed" ) : (
                        <CancelButton disabled={row.disableCancel}>
                        Cancel Unbond
                      </CancelButton> ) }
                      
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Wrapper>

      <Typography
        variant="caption"
        sx={{ color: "#777", fontSize: "13px", mt: 2, display: "block" }}
      >
        Note: Unbonding period is fixed to 14 days from creation. Cancel button
        is only active before unbonding completes.
      </Typography>
    </div>
  );
};

export default UnbondingActivity;
