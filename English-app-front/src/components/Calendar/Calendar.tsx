import {Calendar, DatePicker} from '@mantine/dates';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import {PaperStyled} from "../TeacherComponents/Profile/styles";
import {Accordion, Alert, Button, Card, Center, Stack, Text} from "@mantine/core";
import StudentList from "../TeacherComponents/StudentList/StudentList";
import i18n from "i18next";
import ClassTimeSlots from "./ClassTimeSlots";
import authAxios from "../../common/Api/AuthAxios";
import {showFailureNotification, showSuccessNotification} from "../Notification/NotificationManager";
import {getLocalISOString} from "../../common/utils/common";
import EngineUI, {EngineUIProp} from "../EngineUI/EngineUI";
import {IconAlertCircle} from "@tabler/icons";
import FakeTimeCheck from "./FakeTimeCheck";
import {useHistory} from "react-router-dom";

export interface PlanClass {
    excludedDates: number[]
}

export interface ScheduleData {
    isDefault: Boolean,
    widget?: EngineUIProp
    linkToRoom?: string,
    includedDates: Date[],
    isShowFakeTimeCheck: boolean,
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


function StudentPlanClass() {

    // translations
    const pickDate = i18n.language === "en" ? "Date of class" : "Дата занятия"
    const goToClassRoom = i18n.language === "en" ? "Go to online class" : "Перейти в комнату с учителем"
    const CLASS_TIME_CONSIDERING_ALERT_DESCRIPTION = i18n.language === "en" ? "We got your class request and now waiting for teacher to confirm." : "Мы получили от Вас запрос занятия и сейчас ждем одобрение от учителя"
    const CLASS_TIME_CONSIDERING_ALERT_TITLE = i18n.language === "en" ? "Waiting" : "Ожидаем"

    const [dateValue, setDateValue] = useState(new Date());
    const [timeSlotId, setTimeSlotId] = useState("")

    const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null)
    const [isInClassRoom, setIsInClassRoom] = useState<boolean>(false)
    const [isShowClassDateConsidering, setIsShowClassDateConsidering] = useState(false)

    const handleChange = (x: any) => {
        setDateValue(x)
    }

    const isDateExcluded = (date: Date): boolean => {
        const todayDate = new Date();
        const days = scheduleData?.includedDates.map(x => dayjs(x).day())
        const month = scheduleData?.includedDates.map(x => dayjs(x).month())
        if (days=== undefined || month === undefined) {
            return false
        }
        const res = todayDate > date
            // ||
            // !days.includes(date.getDay())
            // ||
            // !month.includes(date.getMonth())
        if (res === undefined) {
            return false
        }
        return res
    }

    useEffect(() => {
        authAxios.get(`/teacherScheduleApi/getInitialData`).then(x => {
            if (x.data.success) {
                setScheduleData(x.data.data as ScheduleData)
            } else {

            }
        })
    }, [])

    const handleSubmit = () => {
        authAxios.post(`/teacherScheduleApi/startClassConfirmation`, {
            timeSlotId: timeSlotId,
            date: getLocalISOString(dateValue),
        }).then(x => {
            if (x.data.success) {
                showSuccessNotification("Время и дата занятия отправлены учителю на согласование")
                setIsShowClassDateConsidering(true)
            } else {
                showFailureNotification("Что-то пошло не так")
            }
        })
    }

    const [nextMeetings, setNextMeetings] = useState<NextMeeting[]>([])

    useEffect(() => {
        authAxios.get(`/teacherScheduleApi/getConfirmedClasses`).then(x => {
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


    //const history = useHistory()

    const handleGoToRoom = (location: string) => {
        window.location.href=`https://${location}`
    }

    console.log(nextMeetings)

    return (
        <>
            {!isInClassRoom &&
                < Center>
                    {/*<Group position="center" mt="xl">*/}
                    {/*    <Button variant="default" onClick={prevStep}>Back</Button>*/}
                    {/*    <Button onClick={nextStep}>Next step</Button>*/}
                    {/*    <Button onClick={loadQuestions}>Load questions</Button>*/}
                    {/*</Group>*/}
                    <PaperStyled shadow="xl" radius="xl" p="xl">
                        {
                            // isShowClassDateConsidering
                            // ?
                            // <Alert icon={<IconAlertCircle size={16}/>} title={CLASS_TIME_CONSIDERING_ALERT_TITLE}>
                            //     {CLASS_TIME_CONSIDERING_ALERT_DESCRIPTION}
                            // </Alert>
                            // :
                            <Stack>
                                {
                                    // (scheduleData !== undefined && scheduleData?.isDefault !== null && scheduleData?.isDefault) &&
                                    <>
                                        <Text>Выберите когда хотите провести следующее занятие</Text>
                                        <DatePicker
                                            label={pickDate}
                                            locale={i18n.language === "en" ? "en" : "ru"}
                                            value={dateValue}
                                            onChange={handleChange}
                                            excludeDate={isDateExcluded}/>
                                        <ClassTimeSlots date={dateValue} onChoiceChanged={(x) => {
                                            setTimeSlotId(x)
                                        }}/>
                                        <Button onClick={handleSubmit}>Подтвердить</Button>
                                    </>
                                }
                                {/*{(engineUIProp?.type !== undefined && engineUIProp?.type) &&*/}
                                {/*<EngineUI type={engineUIProp?.type!!} data={engineUIProp?.data}/>*/}
                                {/*}*/}

                                {/*{(scheduleData !== undefined && scheduleData?.isDefault !== null && scheduleData?.widget) &&*/}
                                {/*    <EngineUI type={scheduleData?.widget?.type!!} data={scheduleData?.widget?.data}/>*/}
                                {/*}*/}
                                {/*{(scheduleData !== undefined && scheduleData?.isShowFakeTimeCheck !== null && scheduleData?.isShowFakeTimeCheck) &&*/}
                                {/*    <FakeTimeCheck/>*/}
                                {/*}*/}
                                {/*{(scheduleData !== undefined && scheduleData?.isDefault !== null && scheduleData?.linkToRoom) &&*/}
                                {/*    <Button>Перейти на встречу</Button>*/}
                                {/*}*/}
                                <Text>Предстоящие встречи с учителем:</Text>
                                { nextMeetings.length === 0 || nextMeetings === undefined?
                                    <Text> Нет встреч с учителем </Text>: nextMeetings.map((value, index) => (
                                        <Card withBorder={true}>
                                            <Text key={value.id}>{++index}: Ваш учитель созваниевается с вами {value.date} {}
                                                в {String(value.timeSlot.startTime).slice(0, 5)}-{String(value.timeSlot.endTime).slice(0, 5)}</Text>
                                            <Button onClick={() => handleGoToRoom(value.location)} style={{marginTop: 10}}>Перейти на встречу</Button>
                                        </Card>
                                    ))
                                }
                            </Stack>
                        }
                    </PaperStyled>
                </Center>
            }
            {/*{isInClassRoom &&*/}
            {/*    <iframe*/}
            {/*        allow="camera; microphone; display-capture;"*/}
            {/*        title={scheduleData?.linkToRoom}*/}
            {/*        src={scheduleData?.linkToRoom}*/}
            {/*        width="100%"*/}
            {/*        height="100%"*/}
            {/*    />*/}
            {/*}*/}
        </>
    );
}

function withEvent(func: Function): React.ChangeEventHandler<any> {
    return (event: React.ChangeEvent<any>) => {
        const {target} = event;
        func(target.value);
    };
}

export default StudentPlanClass;
