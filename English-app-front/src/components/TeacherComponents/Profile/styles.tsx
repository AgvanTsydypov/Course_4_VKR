import styled from "styled-components";
import {Accordion, Button, Group, Paper, Stack, TextInput} from "@mantine/core";



export const PaperStyled = styled(Paper)<any>`
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const StackStyled = styled(Stack)<any>`
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const TextInputStyled = styled(TextInput)`
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const ButtonStyled = styled(Button)<any>`
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const AccordionStyled = styled(Accordion)<any>`
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
