import { Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ActionTable from "../Dashboard/ValidatorCard/ActionTable";
const WalletActivites = () => {
  const [showAll, setShowAll] = useState(true);
  useEffect(() => {
    setShowAll(true);
  }, []);
  return (
    <div style={{ maxWidth: "1400px", width: "100%", margin: "auto" }}>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "700",
          paddingBottom: "10px",
          marginTop: "-3px",
          paddingTop: "25px",
          paddingBottom: "10px",
        }}
      >
        Wallet Activities
      </Typography>

      <ActionTable showAll={showAll} />
    </div>
  );
};

export default WalletActivites;
