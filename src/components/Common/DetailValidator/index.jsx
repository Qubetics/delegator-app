/*eslint-disable*/
import { MenuItem, Typography } from "@mui/material";
import { Wrapper, StyledSelect } from "./styles";
import { useSelector } from "react-redux";

const DetailValidator = () => {
  const { selectedAccounts } = useSelector((state) => state?.drawer);

  return (
    <Wrapper>
      <Typography variant="body1" color="text.secondary" fontWeight={500}>
        Selected Validator:{`  `}
      </Typography>
      <StyledSelect
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: "#1f1f1f",
            },
          },
        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedAccounts?.accounts}
      >
        <MenuItem style={{ cursor: "default" }} value={selectedAccounts?.accounts}>
          {selectedAccounts?.accounts}
        </MenuItem>
      </StyledSelect>
    </Wrapper>
  );
};

export default DetailValidator;
