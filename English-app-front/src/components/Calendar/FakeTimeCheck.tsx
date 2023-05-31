import i18n from "i18next";
import {Button, Select, Stack, TextInput, Text, Divider, Title} from "@mantine/core";
import {useState} from "react";


const FakeTimeCheck = () => {
    const pickDayOfWeek = i18n.language === "en" ? "Pick day of week" : "Выберите день недели"
    const pickTime = i18n.language === "en" ? "Pick time" : "Выберите время начала занятия"
    const checkThisTime = i18n.language === "en" ? "Check available teachers for this time" : "Проверить наличие свободных учителей"
    const haveFreeTime = i18n.language === "en" ? "Great! There are free teachers for this time. " : "Отлично, есть свободные учителя в выбранное время."

    const monday = i18n.language === "en" ? "Monday" : "Понедельник"
    const tuesday = i18n.language === "en" ? "Tuesday" : "Вторник"
    const wednesday = i18n.language === "en" ? "Wednesday" : "Среда"
    const thursday = i18n.language === "en" ? "Thursday" : "Четверг"
    const friday = i18n.language === "en" ? "Friday" : "Пятница"
    const saturday = i18n.language === "en" ? "Saturday" : "Суббота"
    const sunday = i18n.language === "en" ? "Sunday" : "Воскресенье"

    const time10to11 = i18n.language === "en" ? "10:00 am - 11:00 am" : "10:00 - 11:00"
    const time11to12 = i18n.language === "en" ? "11:00 am - 12:00 pm" : "11:00 - 12:00"
    const time12to13 = i18n.language === "en" ? "12:00 pm - 1:00 pm" : "12:00 - 13:00"
    const time13to14 = i18n.language === "en" ? "1:00 pm - 2:00 pm" : "13:00 - 14:00"
    const time14to15 = i18n.language === "en" ? "2:00 pm - 3:00 pm" : "14:00 - 15:00"
    const time15to16 = i18n.language === "en" ? "3:00 pm - 4:00 pm" : "15:00 - 16:00"
    const time16to17 = i18n.language === "en" ? "4:00 pm - 5:00 pm" : "16:00 - 17:00"
    const time17to18 = i18n.language === "en" ? "5:00 pm - 6:00 pm" : "17:00 - 18:00"
    const time18to19 = i18n.language === "en" ? "6:00 pm - 7:00 pm" : "18:00 - 19:00"
    const time19to20 = i18n.language === "en" ? "7:00 pm - 8:00 pm" : "19:00 - 20:00"
    const time20to21 = i18n.language === "en" ? "8:00 pm - 9:00 pm" : "20:00 - 21:00"
    const time21to22 = i18n.language === "en" ? "9:00 pm - 10:00 pm" : "21:00 - 22:00"

    const [pickedDayOfWeek, setPickedDayOfWeek] = useState<string | null>(null);
    const [pickedTime, setPickedTime] = useState<string | null>(null);
    const [isShowSuccess, setIsShowSuccess] = useState(false)

    const checkFreeTeachers = () => {
        setIsShowSuccess(true)
    }

    return (
        <>
            <Stack>
                <Divider/>
                {isShowSuccess
                    ?
                    <>
                        <Text fz="lg">{haveFreeTime} ({pickedDayOfWeek}, {pickedTime})</Text>
                    </>
                    :
                    <>
                        <Text fz="lg">{checkThisTime}</Text>
                        <Select
                            label={pickDayOfWeek}
                            value={pickedDayOfWeek}
                            onChange={setPickedDayOfWeek}
                            data={[
                                { value: monday, label: monday},
                                { value: tuesday, label: tuesday},
                                { value: wednesday, label: wednesday},
                                { value: thursday, label: thursday},
                                { value: friday, label: friday},
                                { value: saturday, label: saturday},
                                { value: sunday, label: sunday},
                            ]}
                        />

                        <Select
                            label={pickTime}
                            value={pickedTime}
                            onChange={setPickedTime}
                            data={[
                                { value: time10to11, label: time10to11},
                                { value: time11to12, label: time11to12},
                                { value: time12to13, label: time12to13},
                                { value: time13to14, label: time13to14},
                                { value: time14to15, label: time14to15},
                                { value: time15to16, label: time15to16},
                                { value: time16to17, label: time16to17},
                                { value: time17to18, label: time17to18},
                                { value: time18to19, label: time18to19},
                                { value: time19to20, label: time19to20},
                                { value: time20to21, label: time20to21},
                                { value: time21to22, label: time21to22},
                            ]}
                        />

                        <Button onClick={checkFreeTeachers}>{checkThisTime}</Button>
                    </>
                }
            </Stack>
        </>
    )
}

export default FakeTimeCheck