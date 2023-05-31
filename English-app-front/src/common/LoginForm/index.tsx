import { withTranslation } from "react-i18next";
import {InputProps, LoginFormProps} from "../types";
import {StyledLoginForm, StyledLoginFormHeader, StyledLoginInput} from "./styles";
import Input from "../Input";
import React from "react";
import Container from "../Container";
import {Button} from "../Button";
import { ButtonWrapper } from "../../components/ContentBlock/RightContentBlock/styles";

const LoginForm = ({ children, title }: LoginFormProps) => (
    <Container>
        <StyledLoginForm>
            <img src="https://images.all-free-download.com/images/graphiclarge/online_study_banner_digital_meeting_sketch_cartoon_design_6853954.jpg" alt="shit" className="person-img"/>
            {/*<StyledLoginFormHeader>*/}
            {/*    <h1>{title}</h1>*/}
            {/*</StyledLoginFormHeader>*/}
            <StyledLoginInput
                type="text"
                name="name"
                placeholder="Email"
                value={""}
                onChange={()=>{}}
            />
            <StyledLoginInput
                type="text"
                name="name"
                placeholder="Password"
                value={""}
                onChange={()=>{}}
            />
            <ButtonWrapper>
                <Button name="submit">click me</Button>
            </ButtonWrapper>
            {children}
        </StyledLoginForm>
    </Container>
);

export default withTranslation()(LoginForm);
