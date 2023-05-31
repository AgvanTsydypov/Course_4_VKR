import {useEffect, useState} from "react";
import {Alert, Select, Text} from "@mantine/core";
import i18n from "i18next";
import authAxios from "../../common/Api/AuthAxios";
import {IconAlertCircle} from "@tabler/icons";
import {addDays, getLocalISOString} from "../../common/utils/common";

export interface ClassTimeSlotProp {
    onChoiceChanged: (newTimeSlotId: string) => void
    date: Date
}

export interface TimeSlotData {
    id: string,
    startTime: string,
    endTime: string,
}

function ClassTimeSlots(prop: ClassTimeSlotProp) {

    const [openTimeSlots, setOpenTimeSlots] = useState<TimeSlotData[]>([])
    const [data, setData] = useState<string[]>([])
    const [dataToSlotIdMap, setDataToSlotIdMap] = useState(new Map())

    useEffect(()=>{
        authAxios.post(`/teacherScheduleApi/freeSlotsByDay`, {
            day: getLocalISOString(prop.date)
        }).then(x => {
            if (x.data.success) {
                setOpenTimeSlots(x.data.data as TimeSlotData[])
            }
        })
    }, [prop.date])

    // translations
    const pickTime = i18n.language === "en" ? "Pick class time" : "Выберите время занятия"
    const noFreeTimeSlots = i18n.language === "en" ? "There is no free time slot for this day" : "К сожалению, в этот день у учителя нет свободного времени."
    const ALERT_TITLE = i18n.language === "en" ? "Attention!" : "Внимание!"
    const pickOne = i18n.language === "en" ? "Pick one" : "Выберите одно"

    const [value, setValue] = useState<string | null>(null);

    useEffect(() => {
        if (value !== null) {
            prop.onChoiceChanged(dataToSlotIdMap.get(value))
        }
    }, [prop, value])

    useEffect(()=>{
        const map = new Map()
        const dataToRender = []
        for (let i = 0; i < openTimeSlots.length; i++) {
            dataToRender[i] = `${openTimeSlots[i].startTime} - ${openTimeSlots[i].endTime}`
            map.set(dataToRender[i], openTimeSlots[i].id)
        }
        setDataToSlotIdMap(map)
        setData(dataToRender)
    }, [openTimeSlots])

    return (
        <>{openTimeSlots.length > 0
            ?
            <Select
                label={pickTime}
                placeholder={pickOne}
                data={data}
                value={value}
                onChange={setValue}
            />
            :
            <Alert icon={<IconAlertCircle size={16}/>} title={ALERT_TITLE}>
                {noFreeTimeSlots}
            </Alert>
        }
        </>
    );
}

export default ClassTimeSlots;
