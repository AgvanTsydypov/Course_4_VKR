import {Chip, SegmentedControl} from '@mantine/core';
import { useEffect, useState } from "react";
import {RegistrationChipProps} from "../ContactForm/types";
import i18n from "i18next";
import {useStyles} from "./styles";

function GoalPickerChips({onValueChanged}: RegistrationChipProps) {

    // translation
    const speakWithNatives = i18n.language === "en" ? "speak with natives" : "разговаривать с носителями";
    const baseConversations = i18n.language === "en" ? "basic conversation" : "базовые разговоры";
    const examPreparation = i18n.language === "en" ? "exams preparation" : "подготовка к экзаменам";
    const interviewPreparation = i18n.language === "en" ? "interview preparation" : "подготовка к собеседованию";
    const schoolGradeBoost = i18n.language === "en" ? "school grade boost" : "улучшение оценок в школе";
    const preparationForImmigration = i18n.language === "en" ? "preparation for immigration" : "подготовка к иммиграции";
    const preparationForTravelling = i18n.language === "en" ? "preparation for travelling" : "английский для туриста";
    const bookReading = i18n.language === "en" ? "book reading" : "чтение книг на английском";
    const filmWatching = i18n.language === "en" ? "film watching" : "просмотр фильмов на английском";

    // enums
    const speakWithNativesGoalConst = '0'
    const baseConversationsGoalConst = '1'
    const examPreparationGoalConst = '2'
    const interviewPreparationGoalConst = '3'
    const schoolGradeBoostGoalConst = '4'
    const preparationForImmigrationGoalConst = '5'
    const preparationForTravellingGoalConst = '6'
    const bookReadingGoalConst = '7'
    const filmWatchingGoalConst = '8'

    const [value, setValue] = useState(speakWithNativesGoalConst);
    useEffect(()=> {
        onValueChanged(value)
    }, [value, onValueChanged])

    return (
        <SegmentedControl
            color="blue"
            orientation="vertical"
            transitionDuration={500}
            transitionTimingFunction="linear"
            radius="lg"
            value={value}
            onChange={setValue}
            data={[
                { label: `${speakWithNatives}`, value: `${speakWithNativesGoalConst}` },
                { label: `${baseConversations}`, value: `${baseConversationsGoalConst}` },
                { label: `${examPreparation}`, value: `${examPreparationGoalConst}` },
                { label: `${interviewPreparation}`, value: `${interviewPreparationGoalConst}` },
                { label: `${schoolGradeBoost}`, value: `${schoolGradeBoostGoalConst}` },
                { label: `${preparationForImmigration}`, value: `${preparationForImmigrationGoalConst}` },
                { label: `${preparationForTravelling}`, value: `${preparationForTravellingGoalConst}` },
                { label: `${bookReading}`, value: `${bookReadingGoalConst}` },
                { label: `${filmWatching}`, value: `${filmWatchingGoalConst}` },
            ]}
        />
    );
}

export default GoalPickerChips;
