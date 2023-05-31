import {Accordion, Alert, Button, Center, Select, Stack, Title} from '@mantine/core';
import {PaperStyled} from "./styles";
import i18n from "i18next";
import React, {useEffect, useState} from "react";
import {IconAlertCircle} from "@tabler/icons";
import authAxios from '../../../common/Api/AuthAxios';
import {showFailureNotification, showSuccessNotification} from "../../Notification/NotificationManager";

export interface RequestsAllData {
    id: string
    fio: string,
    date: string,
    //status: boolean
}

function NewStudentList() {

    // translation
    const homeworkLine = i18n.language === "en" ? "Homework" : "Домашнее задание";
    const saveLine = i18n.language === "en" ? "Save" : "Сохранить";
    const submitLine = i18n.language === "en" ? "Submit to teacher" : "Отправить на проверку";
    const restoreLine = i18n.language === "en" ? "Restore initial" : "Вернуть изначальный вид";
    const acceptStudent = i18n.language === "en" ? "In order to accept a student click on the button " : "Для того чтобы принять ученика нажмите на кнопку 'Подтвердить'";
    const locale = i18n.language === "en" ? "en-US" : "ru-RU"

    const [studentLinkRequestsAllData, setStudentLinkRequestsAllData] = useState<RequestsAllData[]>([])
    // текст из rte во вкладке, где студент делает домашку

    useEffect(() => {
        authAxios.get(`/teacherProfileApi/getAllLinkRequests`).then(x => {
            if (x.data.success) {
                setStudentLinkRequestsAllData(x.data.data as RequestsAllData[])
            }
        })
    }, [])

    const [studentID, setStudentID] = useState('')
    const [acceptOrNot, setAcceptOrNot] = useState('false');
    const [searchValue, onSearchChange] = useState('');


    const handleChangeTeacherSubmit = async () => {

        console.log(searchValue + " " + acceptOrNot)

        try {
            const {data} = await authAxios.post(`/teacherProfileApi/setStatusLinkToTeacher?id=${searchValue}&status=${acceptOrNot}`)
            if (data.success) {
                if (acceptOrNot === 'true')
                    showSuccessNotification("Ученик был успешно подключен")
                else
                    showSuccessNotification("Ученик был успешно отклонен")
            } else {
                showFailureNotification("Нет ученика для подключения")
            }
        } catch (e) {
            showFailureNotification("ОШИБКА /teacherProfileApi/setStatusLinkToTeacher?id=")
        }
    }

    //console.log(teachersAllData)

    return (
        <Center>
            <PaperStyled shadow="xl" radius="xl" p="xl">
                <Accordion chevronPosition="left" variant="contained">
                    <Accordion.Item value="do-new-hw">
                        <Accordion.Control>
                            Запросы на подключение от учеников
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Stack>
                                {studentLinkRequestsAllData.length > 0
                                    ? <>
                                    <Select
                                        label="Список заявок от учеников"
                                        placeholder="Pick one"
                                        searchable
                                        onChange={(value: string) => onSearchChange(value)}
                                        nothingFound="No options"
                                        data={studentLinkRequestsAllData.map(x => ({value: x.id, label: x.fio}))}
                                    />
                                    <Select
                                        label="Accept or cancel a student"
                                        placeholder="Pick one"
                                        searchable
                                        onChange={(value: string) => setAcceptOrNot(value)}
                                        nothingFound="No options"
                                        data={[
                                            {value: 'true', label: 'Взять'},
                                            {value: 'false', label: 'Отклонить'},
                                        ]}
                                    /> </>
                                    :
                                    <Alert variant="filled" icon={<IconAlertCircle size={16}/>} title="Пока нет новых запросов" color="gray">
                                        К сожалению, нет других запросов от учеников
                                    </Alert>
                                }
                                {searchValue !== "" &&
                                    <>
                                        <Title order={6}>{`${acceptStudent}`}</Title>

                                        <Button onClick={handleChangeTeacherSubmit}>Подтвердить</Button>
                                    </>
                                }
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </PaperStyled>
        </Center>
    );
}


export default NewStudentList;
