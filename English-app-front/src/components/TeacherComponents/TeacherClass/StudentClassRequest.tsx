import {useEffect, useState} from "react";
import {
    ActionIcon,
    Avatar,
    Badge,
    Button,
    Card,
    Center,
    Divider,
    Group,
    Space, Stack,
    Tabs,
    Text
} from "@mantine/core";
import {MantineCard} from "./styles";
import i18n from "i18next";
import {Calendar, Month} from "@mantine/dates";

import authAxios from "../../../common/Api/AuthAxios";
import {showFailureNotification, showSuccessNotification} from "../../Notification/NotificationManager";


export interface ClassRequest {

    classConfirmationId: string,

    date: string,

    sum: string,

    timeSlotId: string,

    timeStart: string,

    timeEnd: string,

    studentFio: string,
}

export interface Time {
    hour: string,
    minute: string,
    second: string,
    nano: string
}

export interface TimeSlot {
    id: string,
    startTime: Time,
    endTime: Time
}

export interface NextMeeting {
    id: string,
    date: string,
    timeSlot: TimeSlot
    studentFio: string,
    location: string
}


// const handleSendAccept = () => {
//     authAxios.get(`/teacherScheduleApiForTeacher/getAllClassRequests`).then(x => {
//             if (x.data.success) {
//                 setClassRequestList(x.data.data as ClassRequest[])
//             }
//         }
//     )
//     authAxios.get("/confirmClass/${classRequestList[0].classConfirmationId}")
//         .then(x => {
//         if (x.data.success) {
//             console.log("request call : " + JSON.stringify(x))
//             showSuccessNotification(`Подтверждено`)
//         } else {
//             console.log("Fail to request phone call")
//             showFailureNotification("К сожалению, что-то пошло не так")
//         }
//     })
// }

function StudentClassRequest() {
    const [classRequestList, setClassRequestList] = useState<ClassRequest[]>([])
    const [dateValue, setDateValue] = useState<Date>(new Date());
    const newClassRequest = i18n.language === "en" ? "Class request" : "Запрос занятия"

    // translations
    const acceptClass = i18n.language === "en" ? "Accept class" : "Подтвердить занятие";
    const cancelClass = i18n.language === "en" ? "Cancel class" : "Отменить занятие";
    const reschaduleClass = i18n.language === "en" ? "Offer different time" : "Предложить другое время";

    //const [lastMeetingText, setLastMeetingText] = useState("Нет назначенных встреч")

    const [text, setText] = useState("")

    const [nextMeetings, setNextMeetings] = useState<NextMeeting[]>([])

    const handleGoToRoom = (location: string) => {
        window.location.href=`https://${location}`
    }



    useEffect(() => {
        authAxios.get(`/teacherScheduleApiForTeacher/getAllNextClasses`).then(x => {
            if (x.data.success) {
                setNextMeetings(x.data.data as NextMeeting[])
            }
        }).catch(x => {
            showFailureNotification("Ошибка запроса следующих классов")
        })
        try {
            setDateValue(new Date(nextMeetings[0].date))
        } catch (e) {
            try {
                setDateValue(new Date(nextMeetings[0].date))
            } catch (e) {

            }
        }
    }, [])

    const acceptLesson = async () => {
        try {
            const {data} = await authAxios.get(`/teacherScheduleApiForTeacher/confirmClass`,{
                params: {
                    classConfirmationId: classRequestList[0].classConfirmationId
                }
            })
            if (data.success) {
                showSuccessNotification("Успешно подверждено!")
                //setLastMeetingText("Последняя подтвержденная встреча | " + text)
                //localStorage.setItem("lastMeetingTextId", "Последняя подтвержденная встреча | " + text)
            } else {
                showFailureNotification("Ошибка подтверждения")
            }
        } catch (e) {
            showFailureNotification("Нет записей для подтверждения")
        }
    }

    const denyLesson = async () => {
        try {
            const {data} = await authAxios.get(`/teacherScheduleApiForTeacher/denyClass`,{
                params: {
                    classConfirmationId: classRequestList[0].classConfirmationId
                }
            })
            if (data.success) {
                showSuccessNotification("Успешно отменено!")
                //setLastMeetingText("")
            } else {
                showFailureNotification("Ошибка отмены")
            }
        } catch (e) {
            showFailureNotification("Нет записей для отмены")
        }
    }

    const getAllClassRequest = async () => {
        const {data} = await authAxios.get(`/teacherScheduleApiForTeacher/getAllClassRequests`)
        setClassRequestList(data.data as ClassRequest[])
        if (data.data.length != 0) {
            setText(data.data[0]?.studentFio + " | Время: " +
                data.data[0]?.timeStart + "-" + data.data[0]?.timeEnd +
                " | Дата: " + data.data[0]?.date)
        } else {
            setText("Нет новых запросов от учеников для подтверждения!")
        }
        //     authAxios.get(`/teacherScheduleApiForTeacher/getAllClassRequests`).then(x => {
    //         if (x.data.success) {
    //             setClassRequestList(x.data.data as ClassRequest[])
    //
    //             try {
    //                 setText(classRequestList[0]?.studentFio + "\nВремя: " +
    //                     classRequestList[0]?.timeStart + "-" + classRequestList[0]?.timeEnd +
    //                     " | Дата: " + classRequestList[0]?.date)
    //             }
    //             catch (e) {
    //                 console.log("asdad")
    //             }
    //         }
    //     }
    // )
    }

    console.log(nextMeetings)

    console.log("asdasd" + classRequestList)

    useEffect(() => {
        getAllClassRequest()
    }, [])
    //console.log(classRequestList)
    return (
        <>
            <Center>
                <MantineCard withBorder radius="md">
                    <Group position="apart">
                        <Badge size="xl" variant="outline">Окно потдверждения занятий с учениками</Badge>
                    </Group>
                    <Space h="md"/>
                    <Divider/>
                    <Center>
                        <Stack>
                            <Space h="md"/>
                            <Month
                                //month={new Date(Date.parse(classRequestList[0].date))}
                                month={dateValue}
                                value={dateValue}
                                styles={{
                                    day: {
                                        '&[data-selected]': {
                                            borderRadius: 100,
                                            position: 'relative',
                                        }
                                    }
                                }
                                }
                            />
                                { nextMeetings.length === 0 && nextMeetings === undefined?
                                    <Text> Нет встреч с учениками </Text>: nextMeetings.map((value, index) => (
                                        <Card withBorder={true}>
                                            <Text key={value.id}>{++index}: {value.studentFio} созваниевается с вами {value.date} {}
                                            в {value.timeSlot.startTime}-{value.timeSlot.endTime}</Text>
                                            <Button onClick={() => handleGoToRoom(value.location)} style={{marginTop: 10}}>Перейти на встречу</Button>
                                        </Card>
                                    ))
                                }
                            {/*{text.length == 0 ?*/}
                            {/*    <Text size="lg">*/}
                            {/*    { localStorage.getItem("lastMeetingTextId") }*/}
                            {/*</Text>: ""}*/}

                        </Stack>
                    </Center>
                    <Divider/>
                    <Space h="md"/>
                    <Text>{text}</Text>
                    <Tabs
                        variant="pills"
                        radius="xl"
                        defaultValue="gallery">
                        {text !== "Нет новых запросов от учеников для подтверждения!"?
                        <Tabs.List grow>
                            <Tabs.Tab value="accept" onDoubleClick={() => acceptLesson()}>{acceptClass}</Tabs.Tab>
                            <Tabs.Tab value="reject" onDoubleClick={() => denyLesson()}>{cancelClass}</Tabs.Tab>
                            {/*<Tabs.Tab value="newtime">{reschaduleClass}</Tabs.Tab>*/}
                        </Tabs.List> : <></>
                        }
                        {/*<Tabs.Panel value="accept" pt="xs">*/}
                        {/*    accept tab content*/}
                        {/*</Tabs.Panel>*/}

                        {/*<Tabs.Panel value="reject" pt="xs">*/}
                        {/*    reject tab content*/}
                        {/*</Tabs.Panel>*/}

                        {/*<Tabs.Panel value="newtime" pt="xs">*/}
                        {/*    newtime tab content*/}
                        {/*</Tabs.Panel>*/}
                    </Tabs>
                </MantineCard>
            </Center>
        </>
    );
}

export default StudentClassRequest;
