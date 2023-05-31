import styled from "styled-components";
import {Accordion, Button, Group, Pagination, Paper, Stack, TextInput} from "@mantine/core";
import {RichTextEditor} from "@mantine/rte";



export const RichTextEditorStyled = styled(RichTextEditor)<any>`
  width: 70%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const GroupStyled = styled(Group)<any>`
  width: 70%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;


export const PaginationStyled = styled(Pagination)<any>`
  width: 70%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const PaperStyled = styled(Paper)<any>`
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
