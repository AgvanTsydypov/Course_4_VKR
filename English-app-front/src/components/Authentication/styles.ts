import styled from "styled-components";
import {Button, Paper, Select, Stack, Tabs} from '@mantine/core'

export const RightBlockContainer = styled("section")`
  position: relative;
  padding: 10rem 0 8rem;

  @media only screen and (max-width: 1024px) {
    padding: 8rem 0 6rem;
  }

  @media only screen and (max-width: 768px) {
    padding: 4rem 0 3rem;
  }
`;

export const Content = styled("p")`
  margin: 1.5rem 0 2rem 0;
`;

export const ContentWrapper2 = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  max-width: 100%;

  @media screen and (min-width: 1024px) {
    max-width: 80%;
  }

  button:last-child {
    margin-left: 20px;
  }
`;

export const SimpleTextUnderLineButton = styled("button")`
  background: none;
  color: black;
  border: none;
  padding: 1rem 0;
  text-decoration: underline; 
  cursor: pointer;   
`;

export const Input = styled("input")`
    margin: 1rem 0;
    width: 100%;
`;

export const RegForm = styled("form" )`
    width: 30%;
    @media only screen and (max-width: 768px) {
        width: 70%;
  }
`;

export const SelectStyle = styled(Select)`
    width: 30%;
    @media only screen and (max-width: 768px) {
        width: 70%;
  }
`;

export const StyledButton = styled("button")`
  background: ${(p) => p.color || "#2e186a"};
  color: ${(p) => (p.color ? "#2E186A" : "#fff")};
  
  font-size: 1rem;
  font-weight: 700;
  width: 30%;
  border: 1px solid #edf3f5;
  
  border-radius: 4px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  justify-content: center;
  
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);

  &:hover {
    color: #fff;
    border: 1px solid rgb(255, 130, 92);
    background-color: rgb(255, 130, 92);
  }
  @media only screen and (max-width: 768px) {
    width: 70%;
  }
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

export const MantineTabStyled = styled(Tabs.Tab)<any>`
  color: #2E186A;  
  font-size: 30px;
`;

export const StackStyled = styled(Stack)<any>`
  width: 30%;
  //background-color: #E9ECEF;
  @media only screen and (max-width: 768px) {
    width: 90%;
  }
  padding-bottom: 5rem;
  padding-top: 5rem;
`;

export const MantinePaperStyled = styled(Paper)<any>`
  //background-color: #E9ECEF;
`;
