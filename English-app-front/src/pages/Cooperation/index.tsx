import {withTranslation} from "react-i18next";
import React, {useState} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
    Alert,
    Badge,
    Button,
    Center,
    Flex,
    Image,
    Paper,
    SimpleGrid,
    Space,
    Stack,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import {BackgroundStyled, MantinePaperStyled, StackStyled} from "./styles";
import {QuickRegistration} from "../../components/QuickRegisteration/QuickRegistration";
import Container3 from "../../common/Container3";
import {BrowserView, MobileView} from "react-device-detect";
import {OurTeachers, tutorsData} from "../../components/TeachersCarousel/OurTeachers";
import i18n from "i18next";
import {IconArrowLeft, IconArrowRight} from "@tabler/icons";
import {ImageCheckboxes} from "../../components/TeachersCarousel/ImageCheckboxes";
import {publicAxios} from "../../common/Api/PublicAxios";


const Cooperation = () => {

    const [isShowSuccess, setIsShowSuccess] = useState(false)
    const [telegram, setTelegram] = useState("")
    const [telegramError, setTelegramError] = useState("")

    const waitForContact = i18n.language === "en" ? "Great! Our manager will contact you in 5 minutes" : "Отлично! В течении 5 минут наш менеджер свяжется с Вами"
    const cooperationRequest = i18n.language === "en" ? "Cooperation request" : "Заявка на сотрудничество"
    const apply = i18n.language === "en" ? "Apply" : "Отправить заявку"
    const noTelegram = i18n.language === "en" ? "Don't have telegram?" : "Нет телеграмма?"
    const payments = i18n.language === "en" ? "We pay 200 rub for each class of every invited student" : "Платим 200 рублей за каждое занятие приглашенного студента"
    const payments2 = i18n.language === "en" ? "So you will get passive income as long as student studies" : "Таким образом, Вы получаете пассивный доход на весь срок обучения студента"
    const yourTelegram = i18n.language === "en" ? "Your telegram" : "Ваш телеграмм"
    const handleSubmit = () => {
        if (telegram.length === 0) {
            setTelegramError("Введите телеграмм")
            return
        }
        publicAxios.post("/quickRegistration/new-cooperation", {
            telegram: telegram,
        }).then(x => {
            if (x.data.success) {
                setIsShowSuccess(true)
            }
        })
    }

    return (
        <>
            <>
                <Container3>
                    <Header/>
                    <Center>

                        <Paper shadow="xl" radius="xl" p="xl">

                        <StackStyled>

                        {isShowSuccess &&
                            <>
                                <Image height={"15rem"} fit={"contain"} src="/img/png/registration-screen.png"></Image>
                                <Center>
                                    <Title>{waitForContact}</Title>
                                </Center>
                            </>
                        }
                        {!isShowSuccess &&
                            <>
                                <Alert title={cooperationRequest}>
                                    <Text>{payments}</Text>
                                    <Text>{payments2}</Text>
                                </Alert>

                                <TextInput
                                    error={telegramError !== "" ? telegramError : null}
                                    radius="xl"
                                    size="xl"
                                    placeholder={yourTelegram}
                                    onChange={e => {
                                        setTelegramError("")
                                        setTelegram(e.target.value)
                                    }}
                                    withAsterisk
                                />
                                <Button
                                    size={"xl"}
                                    radius={"xl"}
                                    onClick={handleSubmit}
                                    variant="gradient" gradient={{from: 'orange', to: 'red'}}
                                >
                                    {apply}
                                </Button>

                                <Button
                                    size={"xl"}
                                    radius={"xl"}
                                    variant={"outline"}
                                >
                                    {noTelegram}
                                </Button>

                            </>
                        }
                    </StackStyled>
                        </Paper>
                    </Center>
                </Container3>
                <Footer/>
            </>
        </>
    );
};

export default withTranslation()(Cooperation);
