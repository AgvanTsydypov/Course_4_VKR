import {useEffect, useState} from "react";
import {Select} from "@mantine/core";
import i18n from "i18next";

export interface StudentGradeProp {
    onChoiceChanged: (newChoice: string) => void
}

function GradePicker(prop: StudentGradeProp) {

    // translations
    const pickGrade = i18n.language === "en" ? "Pick student's grade" : "Выберите оценку студента"
    const pickOne = i18n.language === "en" ? "Pick one" : "Выберите одно"

    const data = ["2", "3-", "3", "4-", "4", "5-", "5", "5+"]

    const [value, setValue] = useState<string | null>(null);

    useEffect(() => {
        if (value !== null)
            prop.onChoiceChanged(value)
    }, [prop, value])

    return (
        <>
            <Select
                transition="pop-top-left"
                transitionDuration={800}
                transitionTimingFunction="ease"
                label={pickGrade}
                placeholder={pickOne}
                data={data}
                value={value}
                onChange={setValue}
            />
        </>
    );
}

export default GradePicker;
