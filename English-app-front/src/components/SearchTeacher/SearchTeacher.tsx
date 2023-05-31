import {Accordion, Alert, Button, Center, Stack, Text, Title, Paper, Avatar, TextInput} from '@mantine/core';
import {PaperStyled} from "./styles";
import i18n from "i18next";
import {useEffect, useState} from "react";
import authAxios from "../../common/Api/AuthAxios";
import {showFailureNotification, showSuccessNotification} from "../Notification/NotificationManager";
import {IconAlertCircle} from "@tabler/icons";


export interface TeachersAllData {
    id: string
    fio: string,
    description: string
}

export interface TeachersAllDataS {
    id: string
    fio: string,
    description: string
    maxSimilarity: string
}

export interface RequestAllData {
    id: string
    fio: string,
    date: string,
    status: boolean | null;
}

export interface MyTeacher {
    id: string,
    fio: string
}

interface UserInfoActionProps {
    avatar: string;
    name: string;
    job: string;
    id: string;
}

function SearchTeacher() {
    // translation
    const homeworkLine = i18n.language === "en" ? "Homework" : "Домашнее задание";
    const saveLine = i18n.language === "en" ? "Save" : "Сохранить";
    const submitLine = i18n.language === "en" ? "Submit to teacher" : "Отправить на проверку";
    const restoreLine = i18n.language === "en" ? "Restore initial" : "Вернуть изначальный вид";
    const changeTeacher = i18n.language === "en" ? "In order to change teacher click on the button " : "Для того чтобы сменить учителя нажмите на кнопку 'Подтвердить'";
    const locale = i18n.language === "en" ? "en-US" : "ru-RU"

    const [teachersAllData, setTeachersAllData] = useState<TeachersAllData[]>([])
    const [searchTeachersAllData, setSearchTeachersAllData] = useState<TeachersAllDataS[]>([])
    const [requestInfo, setRequestInfo] = useState<RequestAllData>()
    const [teacherInfo, setTeacherInfo] = useState<MyTeacher>()

    const [searchInfo, setSearchinfo] = useState("")

    // текст из rte во вкладке, где студент делает домашку

    useEffect(() => {
        authAxios.get(`/profileApi/teacherInfo`).then(x => {
            if (x.data.success) {
                setTeacherInfo(x.data.data)
            }
        })
    }, [])

    //console.log(teacherInfo)
    // console.log(teachersAllData)
    useEffect(() => {
        authAxios.get(`/profileApi/teachersAll`).then(x => {
            if (x.data.success) {
                const result = x?.data?.data?.filter((x: any) => x?.fio !== teacherInfo?.fio)
                //console.log(result)
                setTeachersAllData(result)
            }
        })
    }, [teacherInfo])

    console.log(teachersAllData)

    useEffect(() => {
        authAxios.get(`/profileApi/getLinkRequestInfo`).then(x => {
            if (x.data.success) {
                setRequestInfo(x.data.data as RequestAllData)
                console.log(requestInfo)
            }
        })
    }, [])

    const [teacherID, setTeacherID] = useState('')

    const handleOnSearchChange = (value: string) => {
        setSearchinfo(value)
        authAxios.get(`/profileApi/teacherSearchByFio?searchText=${value}`,).then(x => {
            if (x.data.success) {
                const result = x?.data?.data?.filter((x: any) => x.maxSimilarity > 50 && x?.fio !== teacherInfo?.fio)
                setSearchTeachersAllData(result)
            }
        })
    }
    //console.log(requestInfo)

    return (
        <Center>
            <PaperStyled shadow="xl" radius="xl" p="xl">
                <Accordion chevronPosition="left" variant="contained">
                    <Accordion.Item value="do-new-hw">
                        <Accordion.Control>
                            Выбрать другого учителя
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Stack>
                                {teachersAllData.length > 0
                                    ?
                                    <>
                                        <TextInput
                                            placeholder="Поиск учителей"
                                            label="Найти учителя по ФИО"
                                            onChange={event => handleOnSearchChange(event.target.value)}
                                        />
                                        {searchInfo === "" ?
                                            <div style={{display: 'flex', flexWrap: 'wrap', gap: '25px 52px'}}>
                                                {
                                                    teachersAllData.map((object: TeachersAllData) => <UserInfoAction
                                                        key={object.id} id={object.id} name={object.fio}
                                                        avatar={"data:image/png;base64,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"}
                                                        job={object.description === null ? object.description : "Нет описания"}/>)
                                                }
                                            </div> :
                                            <div style={{display: 'flex', flexWrap: 'wrap', gap: '25px 52px'}}>
                                                {
                                                    searchTeachersAllData.map((object: TeachersAllDataS) =>
                                                        <UserInfoAction key={object.id} id={object.id} name={object.fio}
                                                                        avatar={"data:image/png;base64,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"}
                                                                        job={object.description === null ? object.description : "Нет описания"}/>)
                                                }
                                            </div>
                                        }
                                    </>
                                    :
                                    <Alert variant="filled" icon={<IconAlertCircle size={16}/>}
                                           title="Пока нет новых учителей" color="gray">
                                        К сожалению, нет других учителей
                                    </Alert>
                                }
                                {/*{teacherID !== "" &&*/}
                                {/*<>*/}
                                {/*    <Title order={6}>{`${changeTeacher}`}</Title>*/}

                                {/*    <Button onClick={handleChangeTeacherSubmit}>Подтвердить</Button>*/}
                                {/*</>*/}
                                {/*}*/}
                                {
                                    requestInfo === undefined || requestInfo?.status === null &&
                                    <Text>Еще нет информации по последнему запросу</Text>
                                }
                                {
                                    requestInfo?.status === true &&
                                    <Text>Учитель: {requestInfo?.fio} взял вас к себе в ученики </Text>
                                }
                                {
                                    requestInfo?.status === false &&
                                    <Text>Учитель: {requestInfo?.fio} отказался вас брать к себе в ученики </Text>
                                }
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </PaperStyled>
        </Center>
    );
}

export function UserInfoAction({avatar, name, job, id}: UserInfoActionProps) {
    const handleChangeTeacherSubmit = async () => {
        authAxios.post(`/profileApi/startLinkToTeacher?teacherId=${id}`).then(() => {
            showSuccessNotification("Запрос успешно отправлен")
        }).catch(() => {
            showFailureNotification("Ошибка запроса учителю")
            showFailureNotification("Ошибка запроса /profileApi/startLinkToTeacher")
        })
    }
    return (
        <Paper style={{width: 250}}
            radius="md"
            withBorder
            p="md"
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            })}
        >
            <Avatar src={avatar} size={120} radius={120} mx="auto"/>
            <Text ta="center" fz="lg" weight={500} mt="md">
                {name}
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
                Описание: {job}
            </Text>

            <Button variant="default" fullWidth mt="md" onClick={handleChangeTeacherSubmit}>
                Предложить учиться
            </Button>
        </Paper>
    );
}

export default SearchTeacher;
