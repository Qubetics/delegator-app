/*eslint-disable*/
import { Typography } from "@mui/material";
import ValidatorsInfo from "../../components/Validators/ValidatorsInfo";
import ValidatorsTableList from "../../components/Validators/ValidatorsTableList";
import { Wrapper } from "./styles";

const Validators = () => {
  return (
    <Wrapper>
      <Typography variant="h3">
        Validators
      </Typography>
      {/* <ValidatorsInfo /> */}
      <ValidatorsTableList />
    </Wrapper>
  );
};

export default Validators;
