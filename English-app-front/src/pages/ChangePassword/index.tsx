import {withTranslation} from "react-i18next";
import {useLocation, useHistory} from "react-router-dom";
import React, { useState} from "react";
import i18n from "i18next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Center, PasswordInput, Stack, Tabs, TextInput, Text, Image, Button, Paper, Space} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {showFailureNotification} from "../../components/Notification/NotificationManager";
import Container3 from "../../common/Container3";
import axios from "axios";
import {baseURL, LEFT_SALT_ON_PASS_HASHING, SECRET_PASS_HASH} from "../../config";
import {MantinePaperStyled, StackStyled} from "./styles";

const ChangePassword = () => {
    const location = useLocation()
    const history = useHistory();

    const [visible, {toggle}] = useDisclosure(false)
    const [passwordError, setPasswordError] = useState("")
    const [pass, setPass] = useState("")
    const [passConf, setPassConf] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    const passwordLabel = i18n.language === "en" ? "Password" : "Пароль"
    const passwordAgain = i18n.language === "en" ? "Once again" : "Пароль ещё раз"
    const resetPassword = i18n.language === "en" ? "Set new password" : "Установить новый пароль"
    const generalError = i18n.language === "en" ? "Something went wrong" : "Что-то пошло не так"
    const passwordAndConfNotMatch = i18n.language === "en" ? "Password and password confirmation doesn't match" : "Пароль и подтверждение пароля не совпадают"
    const passwordTooShort = i18n.language === "en" ? "Password should not be less than 5 symbols" : "Пароль не должен быть менее 5 символов"

    const CryptoJS = require("crypto-js");

    const hashPass = (pass: string) => {
        // const salt = "super-simple-salt"
        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, SECRET_PASS_HASH)
        hmac.update(LEFT_SALT_ON_PASS_HASHING)
        hmac.update(pass)
        return hmac.finalize().toString()
    }
    const handleSubmit = () => {
        if (pass !== passConf) {
            setPasswordError(passwordAndConfNotMatch)
            return
        }
        if (pass.length < 1) {
            setPasswordError(passwordTooShort)
            return
        }
        axios.post(`${baseURL}authApi${location.pathname}`, {
            newPassword: hashPass(pass),
        }).then(x => {
            if (x.data.success) {
                history.push("/login")
            } else {
                showFailureNotification(x.data.reason)
            }
        }).catch(x=>showFailureNotification(generalError))
    }

    return (
        <>
            <Header/>
            <Container3>
                <Center>
                    <MantinePaperStyled radius="xl" p="md" withBorder>
                        <StackStyled spacing="xl">
                            <PasswordInput
                                radius="xl"
                                placeholder={passwordLabel}
                                size="xl"
                                visible={visible}
                                onVisibilityChange={toggle}
                                value={pass}
                                error={passwordError !== "" ? passwordError : null}
                                onChange={(event) => setPass(event.currentTarget.value)}
                            />
                            <PasswordInput
                                radius="xl"
                                placeholder={passwordAgain}
                                size="xl"
                                visible={visible}
                                onVisibilityChange={toggle}
                                value={passConf}
                                error={passwordError !== "" ? passwordError : null}
                                onChange={(event) => setPassConf(event.currentTarget.value)}
                            />
                            <Button
                                variant="gradient" gradient={{ from: 'orange', to: 'red' }}
                                radius="xl"
                                loading={isLoading}
                                size="xl"
                                onClick={handleSubmit}
                            >{resetPassword}</Button>
                        </StackStyled>
                    </MantinePaperStyled>
                </Center>

            {/*<Stack spacing="xs" >*/}
            {/*<Center>*/}
            {/*    <Image*/}
            {/*        src="/img/jpg/restorepwd.jpg"*/}
            {/*        height={"15rem"}*/}
            {/*        fit="contain"*/}
            {/*        alt="reset password"*/}
            {/*    />*/}
            {/*</Center>*/}
            {/*<Center>*/}
            {/*    <MantinePaperStyled radius="xl" p="md" withBorder>*/}
            {/*        <Stack>*/}
            {/*            <PasswordInput*/}
            {/*                label={passwordLabel}*/}
            {/*                visible={visible}*/}
            {/*                onVisibilityChange={toggle}*/}
            {/*                value={pass}*/}
            {/*                error={passwordError !== "" ? passwordError : null}*/}
            {/*                onChange={(event) => setPass(event.currentTarget.value)}*/}
            {/*            />*/}
            {/*            <PasswordInput*/}
            {/*                label={passwordAgain}*/}
            {/*                visible={visible}*/}
            {/*                onVisibilityChange={toggle}*/}
            {/*                value={passConf}*/}
            {/*                error={passwordError !== "" ? passwordError : null}*/}
            {/*                onChange={(event) => setPassConf(event.currentTarget.value)}*/}
            {/*            />*/}
            {/*            <MantineButtonStyled*/}
            {/*                loading={isLoading}*/}
            {/*                size={"lg"}*/}
            {/*                onClick={handleSubmit}*/}
            {/*            >{change}</MantineButtonStyled>*/}
            {/*        </Stack>*/}
            {/*    </MantinePaperStyled>*/}
            {/*</Center>*/}
            {/*</Stack>*/}
            </Container3>
            <Footer/>
        </>
    );
};

export default withTranslation()(ChangePassword);
