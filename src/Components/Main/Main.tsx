import { Wrapper, Button } from "./Main.styled";
import { Field } from "../Field/Field";

export const Main = () => {
  return (
    <Wrapper>
      <Button>Top</Button>
      <Button>Left</Button>
      <Button>Right</Button>
      <Field />
      <Button>Bottom</Button>
    </Wrapper>
  );
};
