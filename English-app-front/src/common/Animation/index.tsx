import { StyledAnimationWrapper } from "./styles";
import { ContainerProps } from "../types";

const Container = ({ children }: ContainerProps) => (
  <StyledAnimationWrapper>{children}</StyledAnimationWrapper>
);

export default Container;
