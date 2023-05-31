import {useEffect, useState} from "react";
import {Select} from "@mantine/core";
import i18n from "i18next";
import authAxios from "../../../common/Api/AuthAxios";
import {StudentData} from "../Profile/TeacherProfile";

export interface TopicData {
    topicName: string
}

export interface HomeworkTopicPickerProp {
    topics: TopicData[]
    onChoiceChanged: (newChoice: string) => void
    selfLoad: boolean
    selectedStudentId?: string
    isStudent?: boolean
}

function HomeworkTopicPicker(prop: HomeworkTopicPickerProp) {

    // translations
    const pickTopic = i18n.language === "en" ? "Pick homework topic" : "Выберите тему"
    const pickOne = i18n.language === "en" ? "Pick one" : "Выберите одно"

    const [data, setData] = useState<string[]>([])

    const [value, setValue] = useState<string | null>(null);
    const [topics, setTopics] = useState<TopicData[]>([])

    useEffect(() => {
        if (prop.selfLoad && prop.selectedStudentId) {
            const uri = prop.isStudent ? `homeworkStudentApi/getAllTopicData` : `/homeworkTeacherApi/getAllTopicData/${prop.selectedStudentId}`
            authAxios.get(uri).then(x => {
                    if (x.data.success) {
                        setTopics(x.data.data as TopicData[])
                    }
                }
            )
        } else {
            setTopics(prop.topics)
        }
    }, [prop.selectedStudentId, prop.topics])

    useEffect(()=> {
        setData(topics.map(x=>x.topicName))
    }, [topics])

    useEffect(() => {
        if (value !== null)
            prop.onChoiceChanged(value)
    }, [prop, value])

    return (
        <>
            <Select
                // transition="pop-top-left"
                // transitionDuration={800}
                // transitionTimingFunction="ease"
                label={pickTopic}
                placeholder={pickOne}
                data={data}
                value={value}
                onChange={setValue}
            />
        </>
    );
}

export default HomeworkTopicPicker;
