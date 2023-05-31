import {withTranslation} from "react-i18next";
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Center} from "@mantine/core";
import {BackgroundStyled, MantinePaperStyled} from "./styles";
import {QuickRegistration} from "../../components/QuickRegisteration/QuickRegistration";


const QuickRegistrationPage = () => {


    return (
        <>
            <BackgroundStyled>
                <Header/>
                <MantinePaperStyled>
                    <Center>
                        <QuickRegistration/>
                    </Center>
                </MantinePaperStyled>

                <Footer/>
            </BackgroundStyled>
        </>
    );
};

export default withTranslation()(QuickRegistrationPage);
