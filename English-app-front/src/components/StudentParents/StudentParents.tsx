import {Accordion, Alert, Button, Center, Select, Stack, Text, Title} from '@mantine/core';
import {PaperStyled} from "./styles";
import i18n from "i18next";
import React, {useEffect, useRef, useState} from "react";
import authAxios from "../../common/Api/AuthAxios";
import {RichTextEditor} from "@mantine/rte";
import {showFailureNotification, showSuccessNotification} from "../Notification/NotificationManager";
import {IconAlertCircle} from "@tabler/icons";
import login from "../../pages/Login";

export interface ParentsAllData {
    id: string
    fio: string,
    //description: string
}

export interface RequestAllData {
    id: string
    fio: string,
    date: string,
    status: boolean | null;
}

interface Parent {
    fio?: string,
    id?: string
}

interface StudentProfile {
    notifyOnClasses?: boolean,
    notifyOnHomework?: boolean,
    fio?: string,
    phone?: string,
    telegram?: string,
}

interface GetActiveStep {
    parents: Parent[]
}

function StudentParents() {

    // translation
    const homeworkLine = i18n.language === "en" ? "Homework" : "Домашнее задание";
    const saveLine = i18n.language === "en" ? "Save" : "Сохранить";
    const submitLine = i18n.language === "en" ? "Submit to teacher" : "Отправить на проверку";
    const restoreLine = i18n.language === "en" ? "Restore initial" : "Вернуть изначальный вид";
    const changeTeacher = i18n.language === "en" ? "In order to approve parent click on the button " : "Для того чтобы установить родителя нажмите на кнопку 'Подтвердить'";
    const locale = i18n.language === "en" ? "en-US" : "ru-RU"

    const [pendingParentsAllData, setPendingParentsAllData] = useState<ParentsAllData[]>([])

    const [parents, setParents] = useState<Parent[]>([])
    //const [requestInfo, setRequestInfo] = useState<RequestAllData>()
    // const [teacherInfo, setTeacherInfo] = useState<MyTeacher>()

    // текст из rte во вкладке, где студент делает домашку

    // useEffect(() => {
    //     authAxios.get(`/profileApi/teacherInfo`).then(x => {
    //         if (x.data.success) {
    //             setTeacherInfo(x.data.data)
    //         }
    //     })
    // }, [])

    // const singleQuery = useRef(false)

     //console.log(teacherInfo)
    // console.log(teachersAllData)
    useEffect(() => {
        // if (!singleQuery.current) {
            authAxios.get(`/parentForStudentApi/getPendingParents`).then(x => {
                if (x.data.success) {
                    const result = x?.data?.data
                    //console.log(result)
                    setPendingParentsAllData(result)
                }
            })
        // }
        // singleQuery.current = true
    }, [pendingParentsAllData[0]?.fio])



    useEffect(() => {
        authAxios.get("profileApi/activeStep").then(x => {
            if (x.data.success) {
                const getActiveStep = x.data.data as GetActiveStep
                setParents(getActiveStep.parents as Parent[])
                //console.log(parents)
                //console.log(pendingParentsAllData)
                const result = pendingParentsAllData.filter((x: any) => x?.fio !== parents[0]?.fio)
                //console.log(result)
                setPendingParentsAllData(result)
                //console.log(studentProfile?.notifyOnClasses)
                //console.log(studentProfile?.notifyOnHomework)
                // Отрисовываем то, что получили с бека
            }
        })
    }, [])


    const [parentID, setParentID] = useState('')
    const [acceptOrNot, setAcceptOrNot] = useState('false');

    const handleEstParentSubmit = async () => {
        console.log(parentID)
        console.log(acceptOrNot)
            authAxios.post(`/parentForStudentApi/completeChildConfirmation/${parentID}`, {
                isYes: acceptOrNot
            }).then((x) => {
                console.log(x.data)
                if (x.data.success)
                    if (acceptOrNot === 'true')
                        showSuccessNotification("Родитель успешно подтвержден")
                    else
                        showSuccessNotification("Родитель успешно отклонен")
                else
                    showFailureNotification("Ошибка запроса")
            }).catch(() => {
                showFailureNotification("Ошибка запроса /parentForStudentApi/completeChildConfirmation")
            })
    }

    //console.log(pendingParentsAllData)

    return (
        <Center>
            <PaperStyled shadow="xl" radius="xl" p="xl">
                <Accordion chevronPosition="left" variant="contained">
                    <Accordion.Item value="do-new-hw" style={{width: '300px'}}>
                        <Accordion.Control>
                            Окно подтверждения родителя
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Stack>
                                {pendingParentsAllData.length > 0
                                    ?<>
                                    <Select
                                        label="Список родителей запросивших связывание аккаунтов"
                                        placeholder="Pick one"
                                        searchable
                                        onChange={(value: string) => setParentID(value)}
                                        nothingFound="No options"
                                        data={pendingParentsAllData.map(x => ({value: x.id, label: x.fio}))}
                                    />
                                    <Select
                                        label="Принять или отклонть родителя"
                                        placeholder="Pick one"
                                        searchable
                                        onChange={(value: string) => setAcceptOrNot(value)}
                                        nothingFound="No options"
                                        data={[
                                            {value: 'true', label: 'Принять'},
                                            {value: 'false', label: 'Отклонить'},
                                        ]}
                                    /> </>
                                    :
                                    <Alert variant="filled" icon={<IconAlertCircle size={16}/>} title="Нет заявок" color="gray">
                                        Заявок от родителей еще не поступало!
                                    </Alert>
                                }
                                {parentID !== "" &&
                                <>
                                    <Title order={6}>{`${changeTeacher}`}</Title>

                                    <Button onClick={handleEstParentSubmit}>Подтвердить</Button>
                                </>
                                }
                                {/*{*/}
                                {/*    requestInfo?.status === null &&*/}
                                {/*    <Text>Нет информации по последнему запросу</Text>*/}
                                {/*}*/}
                                {/*{*/}
                                {/*    requestInfo?.status === true &&*/}
                                {/*    <Text>Учитель: {requestInfo?.fio} взял вас к себе в ученики </Text>*/}
                                {/*}*/}
                                {/*{*/}
                                {/*    requestInfo?.status === false &&*/}
                                {/*    <Text>Учитель: {requestInfo?.fio} отказался вас брать к себе в ученики </Text>*/}
                                {/*}*/}
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </PaperStyled>
        </Center>
    );
}


export default StudentParents;
