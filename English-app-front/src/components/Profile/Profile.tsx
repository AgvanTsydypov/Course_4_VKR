import {useEffect, useRef, useState} from 'react';
import {
    Stepper,
    Button,
    Group,
    Accordion,
    Text,
    Stack,
    Title,
    TextInput,
    Mark,
    Flex,
    Center,
    Paper, Switch, Alert, Tabs, Space, Divider, Select, Modal
} from "@mantine/core";
import {showNotification} from '@mantine/notifications';
import {IconAlertCircle, IconCheck, IconPhoto, IconPrinter, IconX} from '@tabler/icons';
import axios from "axios";
import authAxios from "../../common/Api/AuthAxios";
import {AccordionStyled, ButtonStyled, PaperStyled, StackStyled, TextInputStyled} from "./styles";
import {getRandomForTelegramConfirm} from "../../common/Random/Random";
import i18n from "i18next";
import SingleOptionQuestion from "../Tests/SingleOptionQuestion";
import {TestQuestionProp} from "../Tests/Types/TestTypes";
import {publicAxios} from "../../common/Api/PublicAxios";
import TestingProcessor from "../Tests/TestingProcessor";
import {TEST_QUESTIONS_KEY} from "../Tests/Consts";
import {showFailureNotification, showSuccessNotification} from "../Notification/NotificationManager";
import GoalPickerChips from "../Chips/GoalPickerChips";
import {BALANCE_ACTION} from "../../pages/Lk/consts";
import PhoneConfirmation from "../Confirmation/PhoneConfirmation";
import TelegramConfirmation from "../Confirmation/TelegramConfirmation";
import teacherProfile from "../TeacherComponents/Profile/TeacherProfile";
import TeacherProfile from "../TeacherComponents/Profile/TeacherProfile";
import {TeachersAllData} from "../SearchTeacher/SearchTeacher";
import StudentParents from "../StudentParents/StudentParents";

interface GetActiveStep {
    activeStep: number,
    isShowConfirmTelegram: boolean,
    isShowConfirmPhone: boolean,
    isShowGoalPicker: boolean,
    isShowMyTeacher: boolean,
    isShowMyParents: boolean,
    telegramDeeplink: string,
    profile: StudentProfile,
    parents: Parent[]
    //TProfile: TTeacherProfile,
}

interface Parent {
    fio?: string,
}

interface StudentProfile {
    notifyOnClasses?: boolean,
    notifyOnHomework?: boolean,
    fio?: string,
    phone?: string,
    telegram?: string,
}

function Profile() {
    /**
     * Идея: нам нужно задержать отрисовку "фрейма" до того, как мы
     * получим ответ с бекенда, иначе получается, что отрисоывается дефолтный мусор,
     * затем отвечает бек с актуальной информацией, меняется стейт и "фрейм" перерисовывается.
     * Здесь мы сделаем задержку в изначальной отрисовке, также можно рисовать лоадинг индикатор
     */
    const [isRender, setIsRender] = useState(false)
    const [isFirstStepLoading, setIsFirstStepLoading] = useState(false)
    const [isSecondStepLoading, setIsSecondStepLoading] = useState(false)
    const [active, setActive] = useState(3);
    const [fio, setFio] = useState("");
    const [Tfio, setTFio] = useState("");
    const [telegram, setTelegram] = useState<boolean>();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [questions, setQuestions] = useState<TestQuestionProp[]>([])
    const [questionLoaded, setQuestionLoaded] = useState<boolean>(false)
    const [sendTgNotificationsOnClasses, setSendTgNotificationsOnClasses] = useState<boolean>();
    const [sendTgNotificationsOnHomeworks, setSendTgNotificationsOnHomeworks] = useState<boolean>();
    const [isPhoneModelOpened, setIsPhoneModelOpened] = useState(false)
    const [isTelegramModelOpened, setIsTelegramModelOpened] = useState(false)
    const [telegramUpdatedUsername, setTelegramUpdatedUsername] = useState("")
    const [phoneUpdatedNumber, setPhoneUpdatedNumber] = useState("")

    const nextStep = () => {
        setActive((current) => (current < 3 ? current + 1 : current));
    }

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const randomForTelegram = useRef(getRandomForTelegramConfirm())

    const success = i18n.language === "en" ? "Success" : "Успешно"
    const ALERT_TELEGRAM_NOT_CONFIRMED_TITLE = i18n.language === "en" ? "Confirm your telegram." : "Подтвердите телеграмм."
    const ALERT_TELEGRAM_NOT_CONFIRMED_DESC = i18n.language === "en" ? "It is for sending you notification about classes and feedback and homeworks." : "Это нужно для настройки уведомлений о занятиях, фидбеках и домашних работах."
    const ACTIVATE_TG_CLASS_NOTIFICATION = i18n.language === "en" ? "Notification on classes via telegram" : "Уведомлять о занятиях"
    const ACTIVATE_TG_HOMEWORK_NOTIFICATION = i18n.language === "en" ? "Notification on homeworks via telegram" : "Уведомлять о домашних работах"
    const TG_OR_EMAIL = i18n.language === "en" ? "Notifications with telegram or with email" : "Уведомлять через телеграм или через почту"
    const failure = i18n.language === "en" ? "Failure" : "Что-то пошло не так"

    // Секция уже при заполненной анкете
    const [isShowConfirmTelegram, setIsShowConfirmTelegram] = useState(true)
    const [isShowConfirmPhone, setIsShowConfirmPhone] = useState(true)
    const [isShowGoalPicker, setIsShowGoalPicker] = useState(true)
    const [isShowMyTeacher, setIsShowMyTeacher] = useState(true)
    const [isShowMyParents, setIsShowMyParents] = useState(true)
    const [telegramDeeplink, setTelegramDeeplink] = useState<string>("")
    const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null)

    //const [teachProfile, setTeachProfile] = useState<TTeacherProfile | null>(null)
    const [teacherFIO, setTeacherFIO] = useState("")
    const [parents, setParents] = useState<Parent[]>([])


    useEffect(() => {
        authAxios.get("profileApi/activeStep").then(x => {
            if (x.data.success) {
                const getActiveStep = x.data.data as GetActiveStep
                setActive(getActiveStep.activeStep)
                setIsShowConfirmTelegram(getActiveStep.isShowConfirmTelegram)
                setIsShowConfirmPhone(getActiveStep.isShowConfirmPhone)
                setIsShowGoalPicker(getActiveStep.isShowGoalPicker)
                setIsShowMyTeacher(getActiveStep.isShowMyTeacher)
                setIsShowMyParents(getActiveStep.isShowMyParents)
                setTelegramDeeplink(getActiveStep.telegramDeeplink)
                setStudentProfile(getActiveStep.profile as StudentProfile)
                setSendTgNotificationsOnClasses(getActiveStep.profile.notifyOnClasses)
                setSendTgNotificationsOnHomeworks(getActiveStep.profile.notifyOnHomework)
                //setTelegram(getActiveStep.profile.telegram)
                setParents(getActiveStep.parents as Parent[])
                //console.log(studentProfile?.notifyOnClasses)
                //console.log(studentProfile?.notifyOnHomework)
                // Отрисовываем то, что получили с бека
                setIsRender(true)
            }
        })
    }, [])

    //console.log(parents)

    useEffect(() => {
        authAxios.get("/profileApi/teacherInfo").then(x => {
            if (x.data.success) {
                try {
                    const TFIO = x.data.data.fio
                    setTeacherFIO(TFIO)
                    setIsRender(true)
                } catch (e) {
                    setTeacherFIO("Нет учителя")
                    setIsRender(true)
                }
            }
        })
    }, [])

    const handleNameSubmit = () => {
        setIsFirstStepLoading(true)
        authAxios.post("/profileApi/setFio", {
            newFio: fio
        }).then(() => {
            nextStep()
            showSuccessNotification(`ФИО ${fio} успешно сохранено!`)
        }).catch(() => {
            showFailureNotification("К сожалению, ваше имя не сохранено.")
        }).finally(() => {
            setIsFirstStepLoading(false)
        })
    }

    const handleNotificationsSubmit = async () => {
        //await console.log(sendTgNotificationsOnClasses + " " + sendTgNotificationsOnHomeworks)
        authAxios.post(`/profileApi/setNotification?classes`, {
            classes: sendTgNotificationsOnClasses,
            homework: sendTgNotificationsOnHomeworks
        }).then(() => {
            showSuccessNotification(`Успешно изменено`)
        }).catch(() => {
            showFailureNotification("К сожалению, не удалось изменить.")
        })
    }

    return (

        <>
            {isRender &&
            <Stack>
                <Modal
                    opened={isPhoneModelOpened}
                    onClose={() => setIsPhoneModelOpened(false)}
                    title={
                        i18n.language === "en" ? `Confirm phone number` : `Подтвердить номер телефона`
                    }>
                    <PhoneConfirmation onSuccessConfirmation={(newPhone) => {
                        setIsPhoneModelOpened(false)
                        setPhoneUpdatedNumber(newPhone)
                    }}/>
                </Modal>
                <Modal
                    opened={isTelegramModelOpened}
                    onClose={() => setIsTelegramModelOpened(false)}
                    title={
                        i18n.language === "en" ? `Confirm telegram` : `Подтвердить телеграмм`
                    }>
                    <TelegramConfirmation
                        onSuccessConfirmation={(newUsername) => {
                            setIsTelegramModelOpened(false)
                            setTelegramUpdatedUsername(newUsername)
                        }}
                        telegramDeepLink={telegramDeeplink}
                    />
                </Modal>
                {
                    active !== 2 &&
                    <Center>
                        <Stepper active={active} onStepClick={setActive} breakpoint="sm" orientation={"vertical"}>
                            <Stepper.Step label="Шаг 1" description="Введите ФИО" allowStepSelect={active > 0}>
                            </Stepper.Step>
                            <Stepper.Step label="Шаг 2" description="Подтвердите номер телефона или телеграмм"
                                          allowStepSelect={active > 1}>
                            </Stepper.Step>
                            {/*<Stepper.Step label="Шаг 3" description="Пройдите небольшой тест" allowStepSelect={active > 2}>*/}
                            {/*</Stepper.Step>*/}
                            <Stepper.Completed>
                            </Stepper.Completed>
                        </Stepper>
                    </Center>
                }

                <Center>
                    <PaperStyled shadow="xl" radius="xl" p="xl">
                        {active === 0 &&
                        // <Center style={{width: "100%"}}>
                        <Stack>
                            <TextInput
                                placeholder="Иванов Иван Иванович"
                                label="Ваше ФИО"
                                onChange={e => setFio(e.target.value)}
                                disabled={isFirstStepLoading}
                                withAsterisk
                            />
                            <Button
                                onClick={handleNameSubmit}
                                loading={isFirstStepLoading}
                            >Подтвердить</Button>
                        </Stack>
                            // </Center>
                        }

                        {active === 1 &&

                        <Tabs defaultValue="first">
                            <Tabs.List>
                                <Tabs.Tab value="first">Телефон</Tabs.Tab>
                                <Tabs.Tab value="second">Телеграмм</Tabs.Tab>
                            </Tabs.List>
                            <Tabs.Panel value="first">
                                <Space h="xl"/>

                                <PhoneConfirmation onSuccessConfirmation={(newPhone) => {
                                    setPhoneUpdatedNumber(newPhone)
                                    nextStep()
                                }}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="second">
                                <Space h="xl"/>
                                <TelegramConfirmation telegramDeepLink={telegramDeeplink}
                                                      onSuccessConfirmation={(newUsername) => {
                                                          setTelegramUpdatedUsername(newUsername)
                                                          nextStep()
                                                      }}/>

                            </Tabs.Panel>
                        </Tabs>
                        }

                        {
                            active === 2 &&
                            <Accordion chevronPosition="left" variant="contained">
                                {
                                    <Accordion.Item value="your-profile">
                                        <Accordion.Control>
                                            Ваш профиль
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Stack>
                                                <Switch
                                                    label={ACTIVATE_TG_CLASS_NOTIFICATION}
                                                    checked={sendTgNotificationsOnClasses}
                                                    onChange={(event) => {setSendTgNotificationsOnClasses(event.currentTarget.checked)}}
                                                />
                                                <Switch
                                                    label={ACTIVATE_TG_HOMEWORK_NOTIFICATION}
                                                    checked={sendTgNotificationsOnHomeworks}
                                                    onChange={(event) => {setSendTgNotificationsOnHomeworks(event.currentTarget.checked)}}
                                                />
                                                {/*<Switch*/}
                                                {/*    label={TG_OR_EMAIL}*/}
                                                {/*    checked={telegram}*/}
                                                {/*    onChange={(event) => {setTelegram(event.currentTarget.checked)}}*/}
                                                {/*/>*/}
                                                <Button
                                                    variant="outline"
                                                    radius="xl"
                                                    onClick={() => {
                                                        handleNotificationsSubmit()
                                                    }}
                                                    size="xs" compact>
                                                    Подтвердить
                                                </Button>
                                                <Divider/>
                                                <Text>Ваше ФИО: {studentProfile?.fio}</Text>
                                                {((studentProfile?.phone !== undefined && studentProfile?.phone !== null && studentProfile?.phone !== "") || phoneUpdatedNumber !== "") &&
                                                <>
                                                    <Divider/>
                                                    <Group>
                                                        <Text>Ваш телефон: {
                                                            phoneUpdatedNumber !== ""
                                                                ?
                                                                phoneUpdatedNumber
                                                                :
                                                                studentProfile?.phone
                                                        }</Text>
                                                        <Button
                                                            variant="outline"
                                                            radius="xl"
                                                            onClick={() => {
                                                                setIsPhoneModelOpened(true)
                                                            }}
                                                            size="xs" compact>
                                                            изменить
                                                        </Button>
                                                    </Group>
                                                </>
                                                }
                                                {((studentProfile?.telegram !== undefined && studentProfile?.telegram !== null && studentProfile?.telegram !== "") || telegramUpdatedUsername !== "") &&
                                                <>
                                                    <Divider/>
                                                    <Group>
                                                        <Text>Ваш телеграмм: {
                                                            telegramUpdatedUsername !== ""
                                                                ?
                                                                telegramUpdatedUsername
                                                                :
                                                                studentProfile?.telegram
                                                        }</Text>
                                                        <Button
                                                            variant="outline"
                                                            radius="xl"
                                                            onClick={() => {
                                                                setIsTelegramModelOpened(true)
                                                            }}
                                                            size="xs" compact>
                                                            изменить
                                                        </Button>
                                                    </Group>
                                                </>
                                                }
                                            </Stack>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                }
                                {
                                    (isShowConfirmTelegram && telegramUpdatedUsername !== "") &&
                                    <Accordion.Item value="photos">
                                        <Accordion.Control>
                                            Подтвердить телеграмм
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <TelegramConfirmation telegramDeepLink={telegramDeeplink}/>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                }
                                {
                                    (isShowConfirmPhone && phoneUpdatedNumber !== "") &&
                                    <Accordion.Item value="print">
                                        <Accordion.Control>
                                            Подтвердить номер
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <PhoneConfirmation
                                                onSuccessConfirmation={(newPhone) => setPhoneUpdatedNumber(newPhone)}/>

                                        </Accordion.Panel>
                                    </Accordion.Item>
                                }
                                {
                                    isShowGoalPicker &&
                                    <Accordion.Item value="goal-picker">
                                        <Accordion.Control>
                                            Выбрать цель
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <GoalPickerChips onValueChanged={() => {
                                            }}/>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                }
                                {
                                    isShowMyTeacher &&
                                    <Accordion.Item value="my-teacher">
                                        <Accordion.Control>
                                            Мой учитель
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <Text>Учитель: {teacherFIO} </Text>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                }
                                {
                                    isShowMyParents &&
                                    <Accordion.Item value="my-parents">
                                        <Accordion.Control>
                                            Мои родители
                                        </Accordion.Control>
                                        <Accordion.Panel>
                                            <>
                                            {parents.length === 0 ?
                                                <Text span c="red" inherit>Родители еще не привязаны!</Text>:
                                                <Text>Ваш родители: <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>{parents.map((value, index) => (<span key={index} style={{padding: '7px 25px', border: '2px solid #1555eb', margin: '5px 0', borderRadius: 25, display: 'flex', alignItems: 'center', fontSize: '18px'}}>{value.fio}</span>))}</div></Text>
                                            }
                                            <StudentParents/>
                                            </>
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                }
                            </Accordion>
                        }
                    </PaperStyled>
                </Center>
            </Stack>
            }
        </>
    );
}


export default Profile;
