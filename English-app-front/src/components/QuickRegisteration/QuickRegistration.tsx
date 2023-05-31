import {
    Button,
    Image,
    Stack,
    TextInput,
    Title,
    Text,
    Badge,
    Group,
    SimpleGrid,
    Space,
    Divider,
    Alert,
    Center
} from "@mantine/core";
import {OurTeachers, tutorsData} from "../TeachersCarousel/OurTeachers";
import {ImageCheckboxes} from "../TeachersCarousel/ImageCheckboxes";
import i18n from "i18next";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {BrowserView, MobileView} from "react-device-detect";
import {StackStyled} from "./styles";
import {IconArrowLeft, IconArrowRight} from "@tabler/icons";
import {publicAxios} from "../../common/Api/PublicAxios";
import {TimeSlotData} from "../Calendar/ClassTimeSlots";

export const TitleText = React.createContext<any>(null);

export function QuickRegistration() {
    const history = useHistory();

    const [titleText, setTitleText] = useState("")
    const [telegram, setTelegram] = useState("")
    const [telegramError, setTelegramError] = useState("")
    const [tutorIndex, setTutorIndex] = useState(0)
    const [isShowSuccess, setIsShowSuccess] = useState(false)

    const quickRegistration = i18n.language === "en" ? "Quick registration" : "Подобрать носителя"
    const yourTelegram = i18n.language === "en" ? "Your telegram" : "Ваш телеграмм"
    const apply = i18n.language === "en" ? "Apply" : "Отправить заявку"
    const noTelegram = i18n.language === "en" ? "Don't have telegram?" : "Нет телеграмма?"
    const nextTutor = i18n.language === "en" ? "Next tutor" : "Следующий репетитор"
    const waitForContact = i18n.language === "en" ? "Great! Our manager will contact you in 5 minutes" : "Отлично! В течении 5 минут наш менеджер свяжется с Вами"

    const handleSubmit = () => {
        if (telegram.length === 0) {
            setTelegramError("Введите телеграмм")
            return
        }
        publicAxios.post("/quickRegistration/new-request", {
            telegram: telegram,
            choice: titleText
        }).then(x => {
            if (x.data.success) {
                setIsShowSuccess(true)
            }
        })
    }

    const handleNoTelegram = () => {
        history.push("/login")
    }

    return (
        <TitleText.Provider value={{
            titleText, setTitleText
        }}>
            <StackStyled>
                {isShowSuccess &&
                    <>
                        <Image src="/img/png/registration-screen.png"></Image>
                        <Center>
                            <Title>{waitForContact}</Title>
                        </Center>
                    </>
                }
                {!isShowSuccess &&
                    <>
                        <Alert>{quickRegistration}</Alert>
                        <BrowserView>
                            <OurTeachers/>
                        </BrowserView>
                        <MobileView>
                            {
                                <>
                                    <Image src={tutorsData[tutorIndex].image}></Image>
                                    <Text size={"lg"}>{tutorsData[tutorIndex].title}</Text>

                                    <Badge
                                        size={"xl"}>{i18n.language === "en" ? tutorsData[tutorIndex].categoryEn : tutorsData[tutorIndex].categoryRu}</Badge>
                                    <Space h={"md"}/>
                                    <SimpleGrid cols={2}>
                                        <Button
                                            onClick={() => {
                                                setTutorIndex(tutorIndex - 1)
                                                setTitleText(tutorsData[tutorIndex].title)
                                            }}
                                            disabled={tutorIndex === 0}
                                            variant={"outline"}
                                            leftIcon={<IconArrowLeft/>}></Button>
                                        <Button
                                            onClick={() => {
                                                setTutorIndex(tutorIndex + 1)
                                                setTitleText(tutorsData[tutorIndex].title)
                                            }}
                                            disabled={tutorIndex === tutorsData.length - 1}
                                            variant={"outline"}
                                            leftIcon={<IconArrowRight/>}></Button>
                                    </SimpleGrid>
                                </>
                            }
                        </MobileView>
                        <ImageCheckboxes/>
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
                            onClick={handleNoTelegram}
                            variant={"outline"}
                        >
                            {noTelegram}
                        </Button>

                    </>
                }
            </StackStyled>
        </TitleText.Provider>
    )
}