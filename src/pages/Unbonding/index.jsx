/*eslint-disable*/

import { Container } from "@mui/material";
import { Wrapper } from "../Blocks/styles";
import UnbondingActivity from "./UnbondingActivity";

const Unbonding = () => {
  return (
    <div className="unbonding">
      <Wrapper>
        <Container>
          <UnbondingActivity />{" "}
        </Container>{" "}
      </Wrapper>
    </div>
  );
};

export default Unbonding;
