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
import authAxios from "../../../common/Api/AuthAxios";
import {showFailureNotification, showSuccessNotification} from "../../Notification/NotificationManager";
import StudentList from "../StudentList/StudentList";

export interface StudentData {
    id: string,
    fio: string
}

export interface TeacherProfileData {
    needPhoneConfirmation: boolean,
    needTelegramConfirmation: boolean,
    students: StudentData[],
    fio: string,
    description: string
}

function TeacherProfile() {

    const ALERT_TITLE = i18n.language === "en" ? "Attention!" : "Внимание"
    const ALERT_DESCRIPTION = i18n.language === "en" ? `You didn't set up your full name. Your students may NOT recognize you.` : `Вы не указали своё ФИО. При\u00A0подтверждении студенты могут не узнать Вас.`
    const PUT_YOUR_NAME = i18n.language === "en" ? `Fill in your full name` : `Введите полностью ваше Фамилию, Имя, Отчество`
    const PUT_YOUR_NAME_BUTTON = i18n.language === "en" ? `Fill in` : `Указать имя`

    const ALERT_DES_DESCRIPTION = i18n.language === "en" ? `You didn't set up your description. Your students may NOT recognize your description.` : `Вы не указали своё описание. При\u00A0подтверждении студенты могут не узнать Ваше описание.`
    const PUT_YOUR_DES = i18n.language === "en" ? `Fill in your description` : `Введите полностью ваше Описание`
    const PUT_YOUR_DES_BUTTON = i18n.language === "en" ? `Fill in` : `Указать описание`

    const [teacherProfileData, setTeacherProfileData] = useState<TeacherProfileData | null>(null)
    const [teacherFio, setTeacherFio] = useState<string | null>(null)
    const [fioUserInput, setFioUserInput] = useState<string | null>(null);
    const [fioModalOpened, setFioModalOpened] = useState<boolean>(false)
    const [fioSaved, setFioSaved] = useState<boolean>(false)

    const [teacherDes, setTeacherDes] = useState<string | null>(null)
    const [desUserInput, setDesUserInput] = useState<string | null>(null);
    const [desModalOpened, setDesModalOpened] = useState<boolean>(false)
    const [desSaved, setDesSaved] = useState<boolean>(false)

    // translations
    const success = i18n.language === "en" ? "Success" : "Успешно"

    useEffect(() => {
        authAxios.get("teacherProfileApi/profileData")
            .then(x => {
                if (x.data.success) {
                    setTeacherProfileData(x.data.data as TeacherProfileData)
                    setTeacherFio(x.data.data.fio as string)
                    setTeacherDes(x.data.data.description as string)
                } else {
                    setTeacherFio("Ошибка входа в аккаунт")
                    setTeacherDes("Ошибка входа в аккаунт")
                }
            }).catch(x => {
            setTeacherFio("Ошибка сети")
            setTeacherDes("Ошибка сети")
            })
    }, [])

    const handleNameSubmit = () => {
        authAxios.post("/teacherProfileApi/setFio", {
            newFio: fioUserInput
        }).then(() => {
            showSuccessNotification(`ФИО ${fioUserInput} успешно сохранено!`)
            setFioModalOpened(false)
            setFioSaved(true)
        }).catch(() => {
            showFailureNotification("К сожалению, ваше имя не сохранено.")
        })
    }

    const handleDesSubmit = () => {
        authAxios.post(`/teacherProfileApi/setDescription?description=${desUserInput}`
        ).then(() => {
            showSuccessNotification(`Ваше описание успешно сохранено!`)
            setDesModalOpened(false)
            setDesSaved(true)
        }).catch(() => {
            showFailureNotification("К сожалению, ваше описание не сохранено.")
        })
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
                    <Accordion.Item value="photos">
                        <Accordion.Control>
                            Список студентов
                        </Accordion.Control>
                        <Accordion.Panel>
                            {(teacherProfileData !== undefined && teacherProfileData?.students && teacherProfileData.students.length > 0)
                                ?
                                <StudentList
                                    students={teacherProfileData?.students}
                                    onChoiceChanged={()=>{}}
                                    selfLoad={false}/>
                                :
                                <Text>У вас пока нет студентов</Text>
                            }
                        </Accordion.Panel>
                    </Accordion.Item>
                    {/*<Accordion.Item value="print">*/}
                    {/*    <Accordion.Control>*/}
                    {/*        Зарегистрировать ребенка*/}
                    {/*    </Accordion.Control>*/}
                    {/*    <Accordion.Panel>Content</Accordion.Panel>*/}
                    {/*</Accordion.Item>*/}
                    <Accordion.Item value="goal-picker">
                        <Accordion.Control>
                            Ваши данные
                        </Accordion.Control>
                        <Accordion.Panel>
                            {
                                (
                                    !fioSaved && (
                                        teacherProfileData === null ||
                                        teacherProfileData.fio === null
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
                                    <Alert icon={<IconAlertCircle size={16} />} title={ALERT_TITLE} color="red">
                                        {ALERT_DESCRIPTION}
                                    </Alert>
                                    <Button color="red" onClick={() => setFioModalOpened(true)}>{PUT_YOUR_NAME_BUTTON}</Button>
                                </>
                            }
                            {teacherFio !== null ?<Text>ФИО: {teacherFio}</Text> :
                                <Text>ФИО: ФИО еще не установлено</Text>}

                            {
                                (
                                    !desSaved && (
                                        teacherProfileData === null ||
                                        teacherProfileData.description === null
                                    )
                                ) &&
                                <>
                                    <Modal
                                        opened={desModalOpened}
                                        onClose={() => setFioModalOpened(false)}
                                        title={PUT_YOUR_DES}>
                                        <Stack>
                                            <TextInput
                                                placeholder="Я преподаю английский больше 10 лет"
                                                label="Ваше описание"
                                                onChange={e => setDesUserInput(e.target.value)}
                                                withAsterisk
                                            />
                                            <Button onClick={handleDesSubmit}>Подтвердить</Button>
                                        </Stack>
                                    </Modal>
                                    <Alert icon={<IconAlertCircle size={16} />} title={ALERT_TITLE} color="green">
                                        {ALERT_DES_DESCRIPTION}
                                    </Alert>
                                    <Button color="red" onClick={() => setDesModalOpened(true)}>{PUT_YOUR_DES_BUTTON}</Button>
                                </>
                            }
                            {teacherDes !== null ?<Text>Описание: {teacherDes}</Text> :
                                <Text>Описание: Описание еще не установлено</Text>}
                        </Accordion.Panel>
                    </Accordion.Item>
                    {/*<Accordion.Item value="my-teacher">*/}
                    {/*    <Accordion.Control>*/}
                    {/*        Учитель детей*/}
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


export default TeacherProfile;
