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
    Paper, Select, Alert, Modal
} from "@mantine/core";
import {showNotification} from '@mantine/notifications';
import {IconAlertCircle, IconCheck, IconPhoto, IconPrinter, IconX} from '@tabler/icons';
import axios from "axios";
import {AccordionStyled, ButtonStyled, PaperStyled, StackStyled, TextInputStyled} from "./styles";
import i18n from "i18next";
import GoalPickerChips from "../../Chips/GoalPickerChips";
import {showFailureNotification, showSuccessNotification} from "../../Notification/NotificationManager";
import authAxios from "../../../common/Api/AuthAxios";
import {setTokenPair} from "../../../common/Auth/LocalStorageService";
import {flash} from "react-awesome-reveal/dist/animations/attention_seekers";
import {log} from "util";

interface ParentProfileData {
    fio: string | null
}

interface Student {
    fio: string,
    phone: string,
    telegram: string
}

interface Homework {
    grade: string,
    topicName: string,
    finishedDate: string,
    feedBack: string
    fio: string
}


function ParentProfile() {

    const [confirmationMethod, setConfirmationMethod] = useState<string | null>(null);
    const [confirmationData, setConfirmationData] = useState<string>("")
    const [parentProfileData, setParentProfileData] = useState<ParentProfileData | null>(null)
    const [fioModalOpened, setFioModalOpened] = useState<boolean>(false)
    const [fioUserInput, setFioUserInput] = useState<string | null>(null);
    const [fioSaved, setFioSaved] = useState<boolean>(false)

    const [parentFio, setParentFio] = useState<string | null>(null)
    const [myStudents, setMyStudents] = useState<Student[] | null>([])
    const [allMarks, setAllMarks] = useState<Homework[]>([])
    const [marks, setMArks] = useState<Homework[]>([])

    useEffect(() => {
        authAxios.get("parentProfileApi/profileData")
            .then(x => {
                if (x.data.success) {
                    setParentProfileData(x.data.data as ParentProfileData)
                    setParentFio(x.data.data.fio as string)
                    setMyStudents(x.data.data.students as Student[])
                    //console.log(myStudents)
                } else {
                    setParentFio("Ошибка входа в аккаунт")
                }
            }).catch(x => {
            setParentFio("Ошибка сети")
            console.log(x)
        })
    }, [])

    useEffect(() => {
        authAxios.get("homeworkParentApi/getAllData")
            .then(x => {
                if (x.data.success) {
                    setAllMarks(x.data.data)
                } else {

                }
            }).catch(x => {
            console.log(x)
        })
    }, [])

    //console.log(allMarks)

    //console.log(Object.keys(allMarks)[0])

    // consts
    const PHONE = "PHONE"
    const TELEGRAM = "TELEGRAM"
    const FIO = "FIO"
    const ID = "ID"
    const EMAIL = "EMAIL"

    // translations
    const success = i18n.language === "en" ? "Success" : "Успешно"
    const failure = i18n.language === "en" ? "Failure" : "Что-то пошло не так"
    const addChild = i18n.language === "en" ? "My children" : "Мои дети"
    const addChildConfirmationMethod = i18n.language === "en" ? "Child identification method" : "Как идентифицировать ребенка?"
    const pickOne = i18n.language === "en" ? "Pick one" : "Выберите что-то одно"
    const byPhoneNumber = i18n.language === "en" ? "By phone number" : "По номеру телефона"
    const byTelegramNickname = i18n.language === "en" ? "By telegram nickname" : "По нику в телеграмме"
    const byName = i18n.language === "en" ? "By name" : "По ФИО"
    const byId = i18n.language === "en" ? "By id" : "По id в нашей системе"
    const byEmail = i18n.language === "en" ? "By email" : "По электронной почте"

    const PHONE_TR = i18n.language === "en" ? "child's phone" : "телефон ребенка"
    const TELEGRAM_TR = i18n.language === "en" ? "child's telegram" : "телеграмм ребенка"
    const FIO_TR = i18n.language === "en" ? "child's full name" : "ФИО ребенка"
    const ID_TR = i18n.language === "en" ? "child's id" : "ID ребенка"
    const EMAIL_TR = i18n.language === "en" ? "child's email" : "Почта ребенка"

    const ALERT_TITLE = i18n.language === "en" ? "Attention!" : "Внимание"
    const ALERT_DESCRIPTION = i18n.language === "en" ? `You didn't set up your full name. Your child may NOT recognize you.` : `Вы не указали своё ФИО. При\u00A0подтверждении ребенок может не узнать Вас.`
    const PUT_YOUR_NAME = i18n.language === "en" ? `Fill in your full name` : `Введите полностью ваше Фамилию, Имя, Отчество`
    const PUT_YOUR_NAME_BUTTON = i18n.language === "en" ? `Fill in` : `Указать имя`


    const getConfirmationMethodLabel: (confirmationMethodValue: string | null) => string = (confirmationMethodValue) => {
        if (confirmationMethodValue === null) {
            return ""
        }
        if (confirmationMethodValue === PHONE) {
            return byPhoneNumber
        } else if (confirmationMethodValue === ID) {
            return byId
        } else if (confirmationMethodValue === TELEGRAM) {
            return byTelegramNickname
        } else if (confirmationMethodValue === FIO) {
            return byName
        }
        return byEmail
    }

    const getTextInputLabel: (confirmationMethodValue: string | null) => string = (confirmationMethodValue) => {
        if (confirmationMethodValue === null) {
            return ""
        }
        if (confirmationMethodValue === PHONE) {
            return PHONE_TR
        } else if (confirmationMethodValue === ID) {
            return ID_TR
        } else if (confirmationMethodValue === TELEGRAM) {
            return TELEGRAM_TR
        } else if (confirmationMethodValue === FIO) {
            return FIO_TR
        }
        return EMAIL_TR
    }

    const getPlaceholderForLabel: (confirmationMethodValue: string | null) => string = (confirmationMethodValue) => {
        if (confirmationMethodValue === null) {
            return ""
        }
        if (confirmationMethodValue === PHONE) {
            return "+79999559912"
        } else if (confirmationMethodValue === ID) {
            return "f8febe7f-c0d1-4042-adba-1a9c7ef28adb"
        } else if (confirmationMethodValue === TELEGRAM) {
            return "@speakfast-bot"
        } else if (confirmationMethodValue === FIO) {
            return "Иванов Иван Иванович"
        }
        return "speakfast@mail.ru"
    }

    const onConfirmChildClicked = () => {
        if (confirmationMethod == null) {
            showFailureNotification(
                i18n.language === "en"
                    ?
                    "Pick confirmation option"
                    :
                    "Выберите способ подтверждения ребенка"
            )
        } else {
            authAxios.post("parentProfileApi/startChildConfirmation", {
                method: confirmationMethod,
                data: confirmationData,
            }).then(x => {
                if (!x.data.success) {
                    showFailureNotification(x.data.reason)
                } else {
                    showSuccessNotification("Запрос успешно отправлен. Ждем подтверждения от ребенка!")
                }
            })
        }
    }

    const handleNameSubmit = () => {
        authAxios.post("/parentProfileApi/setFio", {
            newFio: fioUserInput
        }).then(() => {
            showSuccessNotification(`ФИО ${fioUserInput} успешно сохранено!`)
            setFioModalOpened(false)
            setFioSaved(true)
        }).catch(() => {
            showFailureNotification("К сожалению, ваше имя не сохранено.")
        })
    }

    //console.log(parentFio)

    // console.log(typeof allMarks)
    // console.log(allMarks)

    const showMarksHandle = (value: string) => {
        const result = allMarks.filter(x => x.fio === value)
        console.log(result)
        setMArks(result)
    }

    return (

        <Stack>
            {/*<Group position="center" mt="xl">*/}
            {/*    <Button variant="default" onClick={prevStep}>Back</Button>*/}
            {/*    <Button onClick={nextStep}>Next step</Button>*/}
            {/*    <Button onClick={loadQuestions}>Load questions</Button>*/}
            {/*</Group>*/}
            <PaperStyled shadow="xl" radius="xl" p="xl">
                <Accordion chevronPosition="left" variant="contained">
                    <Accordion.Item value="parentProfile">
                        <Accordion.Control>
                            Ваши данные
                        </Accordion.Control>
                        <Accordion.Panel>
                            {parentFio !== null ? <Text>ФИО: {parentFio}</Text> :
                                <Text>ФИО: ФИО еще не установлено</Text>}
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="photos">
                        <Accordion.Control>
                            {addChild}
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Stack>
                                {
                                    (
                                        !fioSaved && (
                                            parentProfileData === null ||
                                            parentProfileData.fio === null
                                        )
                                    ) &&
                                    <>
                                        <Modal
                                            opened={fioModalOpened}
                                            onClose={() => setFioModalOpened(false)}
                                            title={PUT_YOUR_NAME}>
                                            <Stack>
                                                <TextInput
                                                    placeholder="Иванов Иван Иванович"
                                                    label="Ваше ФИО"
                                                    onChange={e => setFioUserInput(e.target.value)}
                                                    withAsterisk
                                                />
                                                <Button onClick={handleNameSubmit}>Подтвердить</Button>
                                            </Stack>
                                        </Modal>
                                        <Alert icon={<IconAlertCircle size={16}/>} title={ALERT_TITLE} color="red">
                                            {ALERT_DESCRIPTION}
                                        </Alert>
                                        <Button color="red"
                                                onClick={() => setFioModalOpened(true)}>{PUT_YOUR_NAME_BUTTON}</Button>
                                    </>
                                }
                                <Text c="blue" fw={700}>Найти детей</Text>
                                <Select
                                    label={addChildConfirmationMethod}
                                    placeholder={pickOne}
                                    data={[
                                        {value: PHONE, label: getConfirmationMethodLabel(PHONE)},
                                        {value: TELEGRAM, label: getConfirmationMethodLabel(TELEGRAM)},
                                        {value: FIO, label: getConfirmationMethodLabel(FIO)},
                                        {value: ID, label: getConfirmationMethodLabel(ID)},
                                        {value: EMAIL, label: getConfirmationMethodLabel(EMAIL)},
                                    ]}
                                    value={confirmationMethod}
                                    onChange={setConfirmationMethod}
                                />
                                <TextInput
                                    placeholder={getPlaceholderForLabel(confirmationMethod)}
                                    label={getTextInputLabel(confirmationMethod)}
                                    onChange={e => setConfirmationData(e.target.value)}
                                    withAsterisk
                                />
                                <hr/>
                                <Button onClick={onConfirmChildClicked}>Подтвердить</Button>
                                {myStudents?.length === 0 ? <Text>У вас пока нет добавленных детей</Text> :
                                    <>
                                        <Text>Мои дети:</Text>
                                        {myStudents?.map((value, index) => (<div key={index}><Text>
                                                {++index}: {value.fio} | Telegram: <a
                                                href={`https://t.me/${value.telegram}`}>@{value.telegram}</a>
                                            </Text>
                                                <Button onClick={() => showMarksHandle(value.fio)}
                                                        style={{margin: '20px 0'}}>Показать оценки {value.fio}</Button>
                                                {marks.length === 0 ? (<Text>Пока еще нет оценок</Text>) :
                                                    (<div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'flex-start'
                                                    }}>
                                                        {marks.map((x, index) => <Text key={index} style={{
                                                            padding: '7px 25px',
                                                            border: '2px solid #1555eb',
                                                            margin: '5px 0',
                                                            borderRadius: 25,
                                                            display: 'flex',
                                                            alignItems: 'center'
                                                        }}>
                                                            <div style={{
                                                                marginRight: 10,
                                                                width: 10,
                                                                height: 10,
                                                                backgroundColor: '#000',
                                                                borderRadius: '50%'
                                                            }}></div>
                                                            Название топика: {x.topicName}; Оценка: {x.grade}</Text>)}
                                                    </div>)}
                                            </div>
                                        ))}
                                    </>
                                }
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>

                    {/*<Accordion.Item value="print">*/}
                    {/*    <Accordion.Control>*/}
                    {/*        Зарегистрировать ребенка*/}
                    {/*    </Accordion.Control>*/}
                    {/*    <Accordion.Panel>Content</Accordion.Panel>*/}
                    {/*</Accordion.Item>*/}

                    {/*<Accordion.Item value="goal-picker">*/}
                    {/*    <Accordion.Control>*/}
                    {/*        Ваши данные*/}
                    {/*    </Accordion.Control>*/}
                    {/*    <Accordion.Panel>*/}
                    {/*        <Text>asdasd</Text>*/}
                    {/*        <GoalPickerChips onValueChanged={() => {*/}
                    {/*        }}/>*/}
                    {/*    </Accordion.Panel>*/}
                    {/*</Accordion.Item>*/}

                    {/*<Accordion.Item value="my-teacher">*/}
                    {/*    <Accordion.Control>*/}
                    {/*        Учитель ребенка*/}
                    {/*    </Accordion.Control>*/}
                    {/*    <Accordion.Panel>*/}
                    {/*        <Text>Здесь будет информация по учителю</Text>*/}
                    {/*    </Accordion.Panel>*/}
                    {/*</Accordion.Item>*/}
                </Accordion>
            </PaperStyled>
        </Stack>
    );
}


export default ParentProfile;
