import {useEffect, useState} from "react";
import {Alert, Select, Text, Center, Button, Accordion} from "@mantine/core";
import i18n from "i18next";
import authAxios from "../../common/Api/AuthAxios";
import {IconAlertCircle} from "@tabler/icons";
import {addDays, getLocalISOString} from "../../common/utils/common";
import {DatePicker} from "@mantine/dates";
import ClassTimeSlots from "../Calendar/ClassTimeSlots";
import {PaperStyled} from "../TeacherComponents/Profile/styles";

export interface ClassTimeSlotProp {
    onChoiceChanged: (newTimeSlotId: string) => void
    date: Date
}

export interface TimeSlotData {
    id: string,
    startTime: string,
    endTime: string,
}

function Information() {

    return (
        <>

        </>
    );
}

export default Information;
