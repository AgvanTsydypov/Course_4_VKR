import React, {useEffect, useState} from "react";
import {IconArrowLeft} from "@tabler/icons";
import {MantinePaperStyled, MantineTabStyled, StackStyled} from "./styles";
import {
    Button,
    Center,
    Grid,
    Image,
    Paper,
    PasswordInput,
    Popover,
    Stack,
    Tabs,
    Text,
    TextInput,
    Title
} from '@mantine/core';
import i18n from "i18next";
import axios from "axios";
import {useHistory} from "react-router-dom";
import RolePickerChips from "../Chips/RolePickerChips";
import {setTokenPair} from "../../common/Auth/LocalStorageService";
import {showFailureNotification, showSuccessNotification} from "../Notification/NotificationManager";
import {baseURL, INFO_LINE, LEFT_SALT_ON_PASS_HASHING, SECRET_PASS_HASH} from "../../config";
import {useDisclosure} from "@mantine/hooks";
import {LanguageSwitch, LanguageSwitchContainer} from "../Footer/styles";
import {SvgIcon} from "../../common/SvgIcon";


export function StyledTabs(props) {
    return (
        <Tabs
            unstyled
            styles={(theme) => ({
                tab: {
                    ...theme.fn.focusStyles(),
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
                    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4]}`,
                    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                    cursor: 'pointer',
                    fontSize: theme.fontSizes.sm,
                    borderRadius: '1rem',

                    '&:disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                    },

                    '&[data-active]': {
                        backgroundColor: '#2e186a',
                        borderColor: '#2e186a',
                        color: theme.white,
                    },
                },
            })}
            {...props}
        />
    );
}

export const Login = () => {
    // Hooks
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [passConf, setPassConf] = useState("")
    const [isPasswordReset, setIsPasswordReset] = useState(false)
    const [isPasswordResetClicked, setIsPasswordResetClicked] = useState(false)
    const [isConfirmMailMessage, setIsConfirmMailMessage] = useState(false)
    const history = useHistory();

    // Подробнее о ролях смотрите [ChipsExamples]
    const [role, setRole] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [visible, {toggle}] = useDisclosure(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    // Consts
    const placeHolderEmail = i18n.language === "en" ? "Email" : "Почта"
    const onceAgain = i18n.language === "en" ? "Password once again" : "Пароль ещё раз"
    const forgotYourPass = i18n.language === "en" ? "Forgot your password?" : "Забыли пароль?"
    const invalidEmail = i18n.language === "en" ? "Email is invalid" : "Почта некорректна"
    const passwordAndConfNotMatch = i18n.language === "en" ? "Password and password confirmation doesn't match" : "Пароль и подтверждение пароля не совпадают"
    const passwordTooShort = i18n.language === "en" ? "Password should not be less than 5 symbols" : "Пароль не должен быть менее 5 символов"
    const placeHolderPass = i18n.language === "en" ? "Password" : "Пароль"
    const placeHolderSubmitButton = i18n.language === "en" ? "Submit" : "Войти"
    const backButton = i18n.language === "en" ? "Back" : "Назад"
    const resetPassword = i18n.language === "en" ? "Reset password" : "Сбросить пароль"
    const dontHaveAccount = i18n.language === "en" ? "Don't have account?" : "Нет аккаунта?"
    const alreadyHaveAccount = i18n.language === "en" ? "Already have account?" : "Есть аккаунт?"
    const placeHolderRegisterButton = i18n.language === "en" ? "Register" : "Зарегистрироваться"
    const emailSent = i18n.language === "en" ? "Now confirm email" : "Теперь подтвердите почту"
    const yourRole = i18n.language === "en" ? "What is your role?" : "Ваша роль?"
    const student = i18n.language === "en" ? "student" : "ученик"
    const teacher = i18n.language === "en" ? "teacher" : "учитель"
    const registration = i18n.language === "en" ? "Sign up" : "Регистрация"
    const login = i18n.language === "en" ? "Sign in" : "Вход"
    const followEmailSteps = i18n.language === "en" ? "Email has been sent. Please, follow the steps to reset password" : "Вам было отправлено письмо. Пожалуйста, следуйте инструкциям из него."
    const CryptoJS = require("crypto-js");

    const hashPass = (pass) => {
        // const salt = "super-simple-salt"
        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, SECRET_PASS_HASH)
        hmac.update(LEFT_SALT_ON_PASS_HASHING)
        hmac.update(pass)
        //return hmac.finalize().toString()
        return pass
    }

    useEffect(() => {
        setEmailError("")
    }, [email, setEmailError])

    useEffect(() => {
        setPasswordError("")
    }, [setPasswordError, pass])
    // Handlers
    const handleLoginSubmit = async (e) => {
        if (email.length < 5) {
            setEmailError(emailError)
            return
        }
        if (pass.length < 1) {
            setPasswordError(passwordTooShort)
            return
        }
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post(`${baseURL}authApi/sign-in-request`, {
                "email": email,
                "password": hashPass(pass)
            });
            if (res.data.success === true) {
                setTokenPair({
                    accessToken: res.data.data.accessToken,
                    refreshToken: res.data.data.refreshToken
                })
                history.replace("/lk")
            } else {
                showFailureNotification(res.data.reason)
            }
        } catch (err) {
            showFailureNotification("Something went wrong | Что-то пошло не так")
        } finally {
            setIsLoading(false)
        }
    }
    const handleRegistrationSubmit = async (e) => {
        e.preventDefault()
        try {
            if (pass !== passConf) {
                setPasswordError(passwordAndConfNotMatch)
                return
            }
            if (pass.length < 1) {
                setPasswordError(passwordTooShort)
                return
            }
            if (email === "" || !email.includes("@") || email.length < 5) {
                setEmailError(invalidEmail)
                return
            }
            setIsLoading(true)
            const res = await axios.post(`${baseURL}authApi/registration-request`, {
                "email": email,
                "password": hashPass(pass),
                "role": role,
            });
            if (res.data.success === true) {
                setIsConfirmMailMessage(true)
            } else {
                showFailureNotification(res.data.reason)
            }
            setIsLoading(false)
        } catch (err) {
            showFailureNotification("Something went wrong | Что-то пошло не так")
        } finally {
            setIsLoading(false)
        }

    }

    const handleToPasswordReset = () => {
        setIsPasswordReset(true)
    }

    const handlePasswordResetButton = () => {
        if (email.length < 5) {
            setEmailError(invalidEmail)
            return
        }
        axios.post(`${baseURL}authApi/startChangePassword`, {
            "email": email,
        }).then(x => {
            if (x.data.success) {
                showSuccessNotification(followEmailSteps)
                setIsPasswordResetClicked(true)
            }
        })
    }

    const handleTabChange = () => {
        setEmailError("")
        setPasswordError("")
    }

    const handleBackButton = () => {
        setIsPasswordReset(false)
    }

    return (
        <Center>
            <StackStyled>
                {isPasswordResetClicked
                    ?
                    <MantinePaperStyled radius="xl" p="md" withBorder>
                        <Stack>
                            <Image src="/img/png/registration-screen.png"></Image>
                            <Center>
                                <Title>{followEmailSteps}</Title>
                            </Center>
                        </Stack>
                    </MantinePaperStyled>
                    :
                    <>
                        {isConfirmMailMessage &&
                            <MantinePaperStyled radius="xl" p="md" withBorder>
                                <Stack>
                                    <Image src="/img/png/registration-screen.png"></Image>
                                    <Center>
                                        <Title>{emailSent}</Title>
                                    </Center>
                                </Stack>
                            </MantinePaperStyled>
                        }
                        {(!isConfirmMailMessage && isPasswordReset) &&
                            <Stack>
                                <MantinePaperStyled radius="xl" p="md" withBorder>
                                    <Stack spacing="xl">
                                        <TextInput
                                            radius="xl"
                                            placeholder={placeHolderEmail}
                                            error={emailError !== "" ? emailError : null}
                                            size="xl"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            withAsterisk
                                        />
                                        <Button
                                            variant="gradient" gradient={{from: 'orange', to: 'red'}}
                                            radius="xl"
                                            loading={isLoading}
                                            error={passwordError !== "" ? passwordError : null}
                                            size="xl"
                                            onClick={handlePasswordResetButton}
                                        >{resetPassword}</Button>
                                        <Grid grow align="center">
                                            <Grid.Col span={6}>
                                                <Button
                                                    sx={{width: '100%'}}
                                                    variant="gradient" gradient={{from: 'teal', to: 'lime', deg: 105}}
                                                    radius="xl"
                                                    loading={isLoading}
                                                    error={passwordError !== "" ? passwordError : null}
                                                    size="xl"
                                                    leftIcon={<IconArrowLeft/>}
                                                    onClick={handleBackButton}
                                                >{backButton}</Button>
                                            </Grid.Col>
                                        </Grid>
                                    </Stack>
                                </MantinePaperStyled>
                            </Stack>
                        }
                        {(!isConfirmMailMessage && !isPasswordReset) &&
                            <Tabs variant="pills" color="red.6" radius="xl" defaultValue="login"
                                  onTabChange={handleTabChange}>
                                <Paper shadow="xs" radius="xl" p="xs">
                                    <Tabs.List grow>
                                        <MantineTabStyled value="login">{login}</MantineTabStyled>
                                        <MantineTabStyled value="registration">{registration}</MantineTabStyled>
                                    </Tabs.List>
                                </Paper>

                                <Tabs.Panel value="login" pt="xs" sx={
                                    {
                                        paddingBottom: '30px',
                                        paddingTop: '30px'
                                    }
                                }
                                >
                                    <MantinePaperStyled radius="xl" p="md" withBorder>
                                        <Stack spacing="xl">
                                            <TextInput
                                                radius="xl"
                                                placeholder={placeHolderEmail}
                                                error={emailError !== "" ? emailError : null}
                                                size="xl"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                withAsterisk
                                            />
                                            <PasswordInput
                                                error={passwordError !== "" ? passwordError : null}
                                                radius="xl"
                                                placeholder={placeHolderPass}
                                                size="xl"
                                                visible={visible}
                                                onVisibilityChange={toggle}
                                                value={pass}
                                                onChange={(event) => setPass(event.currentTarget.value)}
                                            />
                                            <Button
                                                variant="gradient" gradient={{from: 'orange', to: 'red'}}
                                                radius="xl"
                                                loading={isLoading}
                                                error={passwordError !== "" ? passwordError : null}
                                                size="xl"
                                                onClick={(e) => handleLoginSubmit(e)}
                                            >{placeHolderSubmitButton}</Button>
                                            <Button
                                                variant="outline"
                                                color="red.6"
                                                radius="xl"
                                                loading={isLoading}
                                                size="xl"
                                                onClick={(e) => handleToPasswordReset(e)}
                                            >{forgotYourPass}</Button>
                                        </Stack>
                                    </MantinePaperStyled>
                                </Tabs.Panel>

                                <Tabs.Panel value="registration" pt="xs" sx={
                                    {
                                        paddingBottom: '30px',
                                        paddingTop: '30px'
                                    }
                                }>
                                    <MantinePaperStyled radius="xl" p="md" withBorder>
                                        <Stack spacing="xl">
                                            <TextInput
                                                radius="xl"
                                                placeholder={placeHolderEmail}
                                                size="xl"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                error={emailError !== "" ? emailError : null}
                                            />
                                            <PasswordInput
                                                radius="xl"
                                                placeholder={placeHolderPass}
                                                size="xl"
                                                visible={visible}
                                                onVisibilityChange={toggle}
                                                value={pass}
                                                error={passwordError !== "" ? passwordError : null}
                                                onChange={(event) => setPass(event.currentTarget.value)}
                                            />
                                            <PasswordInput
                                                radius="xl"
                                                placeholder={onceAgain}
                                                size="xl"
                                                visible={visible}
                                                onVisibilityChange={toggle}
                                                value={passConf}
                                                error={passwordError !== "" ? passwordError : null}
                                                onChange={(event) => setPassConf(event.currentTarget.value)}
                                            />
                                            <RolePickerChips onValueChanged={x => {
                                                setRole(x)
                                            }}/>
                                            <Button
                                                variant="gradient" gradient={{from: 'orange', to: 'red'}}
                                                radius="xl"
                                                loading={isLoading}
                                                size="xl"
                                                onClick={(e) => handleRegistrationSubmit(e)}
                                            >{placeHolderRegisterButton}</Button>

                                        </Stack>
                                    </MantinePaperStyled>
                                </Tabs.Panel>
                            </Tabs>
                        }
                    </>
                }
            </StackStyled>
        </Center>
    )
}
