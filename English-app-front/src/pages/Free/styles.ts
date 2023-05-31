import styled from "styled-components";
import {Button, Paper, Stack} from "@mantine/core";

export const MantinePaperStyled = styled(Paper)<any>`
  margin-top: 1.5rem;
  margin-bottom: 3.5rem;
  
`;

export const BackgroundStyled = styled(Paper)<any>`
  background-color: #E9ECEF;
`;

export const StackStyled = styled(Stack)<any>`
`;

export const MantineButtonStyled = styled(Button)<any>`
  background-color: #2E186A;  
  // width: 30%;
  // @media only screen and (max-width: 768px) {
  //   width: 70%;
  // }
  &:hover {
    color: #fff;
    border: 1px solid rgb(255, 130, 92);
    background-color: rgb(255, 130, 92);
  }
`;
