import {useEffect, useState} from 'react';
import {Accordion, Alert, Button, Center, Stack, TextInput, Title} from '@mantine/core';
import {RichTextEditor} from "@mantine/rte";
import {PaperStyled} from "./styles";
import i18n from "i18next";
import authAxios from "../../../common/Api/AuthAxios";
import {StudentData, TeacherProfileData} from "../Profile/TeacherProfile";
import StudentList from "../StudentList/StudentList";
import {DatePicker} from "@mantine/dates";
import 'dayjs/locale/ru';
import GradePicker from "../GradePicker/GradePicker";
import {
    showFailureNotification,
    showInfoNotification,
    showSuccessNotification
} from "../../Notification/NotificationManager";
import HomeworkTopicPicker, {TopicData} from "../TopicPicker/HomeworkTopicPicker";
import {flash} from "react-awesome-reveal/dist/animations/attention_seekers";
import {IconAlertCircle} from "@tabler/icons";


export interface PendingHomeworkData {
    studentId: string,
    topic: string,
    homework: string
}

export interface TeacherHomeworkAllData {
    studentData: StudentData[],
    topicData: TopicData[],
    pendingHomeworkData: PendingHomeworkData[]
}

function TeacherHomework() {

    // translation
    const homeworkLine = i18n.language === "en" ? "Homework" : "Домашнее задание";
    const saveLine = i18n.language === "en" ? "Save" : "Сохранить";
    const submitLine = i18n.language === "en" ? "Submit to teacher" : "Отправить на проверку";
    const restoreLine = i18n.language === "en" ? "Restore initial" : "Вернуть изначальный вид";
    const createNewHomework = i18n.language === "en" ? "Create new homework" : "Создать новую домашнюю работу";
    const confirm = i18n.language === "en" ? "Confirm" : "Подтвердить";


    const [valueCreateHomework, onChangeValueCreateHomework] = useState("");
    const [valueCheckHomework, onChangeValueCheckHomework] = useState("");
    const [opened, setOpened] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null)
    const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null)
    const [date, setDate] = useState(new Date());
    const [topic, setTopic] = useState("")
    const [grade, setGrade] = useState("")
    // Когда выпадает блашка со всеми работами, учитель может найти работу по теме
    const [pickedHomework, setPickedHomework] = useState<string | null>(null)
    const [loadedPickedHomework, setLoadedPickedHomework] = useState<string | null>(null)
    const [teacherHWAllData, setTeacherHWAllData] = useState<TeacherHomeworkAllData | null>(null)
    const [evaluatingHomeworkTopic, setEvaluatingHomeworkTopic] = useState("")
    const [feedRu, setFeedRu] = useState("")
    // Каждый раз при изменении студента и топика мы подгружаем его решение
    useEffect(() => {
        if (selectedTopic?.topicName && selectedStudent?.id) {
            authAxios.get(`homeworkTeacherApi/getHomework/${selectedStudent?.id}/${selectedTopic?.topicName}`)
                .then(x => {
                    if (x.data.success) {
                        setLoadedPickedHomework(x.data.data as string)
                    }
                })
        }
    }, [selectedTopic?.topicName, selectedStudent?.id])


    useEffect(() => {
        authAxios.get(`homeworkTeacherApi/getAllData`).then(x => {
            if (x.data.success) {
                setTeacherHWAllData(x.data.data as TeacherHomeworkAllData)
            }
        })
    }, [])

    // Учитель выбрал домашку с другой темой для проверки
    // Нам нужно обновить содержимое в RTE
    useEffect(() => {
        if (teacherHWAllData?.pendingHomeworkData && selectedStudent?.id) {
            const foundValue = teacherHWAllData.pendingHomeworkData
                .find(x => (x.topic === evaluatingHomeworkTopic) && x.studentId === selectedStudent?.id)
            const newValue = foundValue === undefined ? "" : foundValue.homework
            onChangeValueCheckHomework(() => newValue)
        }
    }, [evaluatingHomeworkTopic, teacherHWAllData?.pendingHomeworkData, selectedStudent?.id])

    const handleCreateNewHomework = () => {
        if (selectedStudent?.id === undefined) {
            showInfoNotification("Выберите студента!")
        } else {
            authAxios.post("homeworkTeacherApi/createHomeworkForStudent", {
                homework: valueCreateHomework,
                studentId: selectedStudent?.id,
                indexOfHw: 0, // здесь не важно какой индекс при создании новой работы
                deadline: date,
                topic: topic
            }).then(x => {
                if (x.data.success) {
                    showSuccessNotification("Сохранено")
                } else {
                    showFailureNotification(x.data.reason)
                }
            }).catch(() => showFailureNotification("Fuckup"))
        }
    }

    const handleHomeworkGraded = () => {
        if (grade === "") {
            showInfoNotification("Выберите оценку для студента")
        }
        else {
            authAxios.post("homeworkTeacherApi/gradeHomework", {
                grade: grade,
                studentId: selectedStudent?.id,
                topic: evaluatingHomeworkTopic,
                feedBackEn: "",
                feedBackRu: feedRu
            }).then(x => {
                if (x.data.success) {
                    showSuccessNotification("Сохранено")
                    console.log(grade)
                } else {
                    showFailureNotification(x.data.reason)
                }
            }).catch(() => showFailureNotification("Something went wrong"))
        }
    }

    return (
        <Stack>
            <Center>
                <Title order={2}>{homeworkLine}</Title>
            </Center>
            <Center>
                <PaperStyled shadow="xl" radius="xl" p="xl">
                    <Stack>
                        <StudentList
                            students={teacherHWAllData?.studentData === undefined ? [] : teacherHWAllData.studentData}
                            onChoiceChanged={x => setSelectedStudent(x)} selfLoad={false}/>
                        <Accordion chevronPosition="left" variant="contained">
                            <Accordion.Item value="check-hw">
                                <Accordion.Control>
                                    {createNewHomework}
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Stack>
                                        <TextInput
                                            placeholder="animals"
                                            label="Тема"
                                            onChange={e => setTopic(e.target.value)}
                                            withAsterisk
                                        />
                                        <DatePicker
                                            value={date}
                                            onChange={e => {
                                                if (e !== null) {
                                                    setDate(e)
                                                }
                                            }}
                                            placeholder="Дата"
                                            label="День дедлайна"
                                            locale={i18n.language === "en" ? "en" : "ru"}
                                            withAsterisk/>
                                        <RichTextEditor
                                            value={valueCreateHomework}
                                            onChange={onChangeValueCreateHomework}
                                            id="rte"
                                        />
                                        <Button onClick={handleCreateNewHomework}>{confirm}</Button>
                                    </Stack>
                                </Accordion.Panel>
                            </Accordion.Item>
                            <Accordion.Item value="prepare-new-hw">
                                <Accordion.Control>
                                    Проверить домашнюю работу
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Stack>
                                        {!selectedStudent?.id || !teacherHWAllData?.topicData || teacherHWAllData?.topicData.length === 0
                                            ?
                                            <Alert
                                                icon={<IconAlertCircle size={16}/>}
                                                title="Внимание!"
                                                color="gray"
                                                variant="filled">
                                                {
                                                    selectedStudent?.id === undefined
                                                        ?
                                                        "Вы не выбрали студента"
                                                        :
                                                        "У данного студента нет сданных новых домашек"
                                                }
                                            </Alert>
                                            :
                                            <HomeworkTopicPicker
                                                topics={teacherHWAllData.topicData}
                                                onChoiceChanged={x => setEvaluatingHomeworkTopic(x)}
                                                selfLoad={false}
                                                selectedStudentId={selectedStudent?.id}/>
                                        }
                                        {valueCheckHomework !== "" &&
                                            <>
                                                <RichTextEditor
                                                    value={valueCheckHomework}
                                                    onChange={onChangeValueCheckHomework}
                                                    id="rte2"
                                                />
                                                <GradePicker onChoiceChanged={(newGrade) => {
                                                    setGrade(newGrade)
                                                }}/>
                                                <TextInput
                                                    placeholder="Введите комментарий"
                                                    label="Ваш комменнтарий"
                                                    onChange={event => setFeedRu(event.target.value)}
                                                />
                                                <Button onClick={handleHomeworkGraded}>Подтвердить</Button>
                                            </>
                                        }
                                    </Stack>
                                </Accordion.Panel>
                            </Accordion.Item>
                            {/*<Accordion.Item value="all-hw">*/}
                            {/*    <Accordion.Control>*/}
                            {/*        Все домашнии работы*/}
                            {/*    </Accordion.Control>*/}
                            {/*    <Accordion.Panel>*/}
                            {/*        <Stack>*/}
                            {/*            <HomeworkTopicPicker topics={[]} onChoiceChanged={x => setSelectedTopic({*/}
                            {/*                topicName: x*/}
                            {/*            })} selfLoad={true} selectedStudentId={selectedStudent?.id === undefined ? null : selectedStudent?.id}/>*/}
                            {/*            {loadedPickedHomework &&*/}
                            {/*            <RichTextEditor*/}
                            {/*                value={loadedPickedHomework}*/}
                            {/*                readOnly={true}*/}
                            {/*                id="rte3"*/}
                            {/*            />*/}
                            {/*            }*/}
                            {/*        </Stack>*/}
                            {/*    </Accordion.Panel>*/}
                            {/*</Accordion.Item>*/}
                        </Accordion>
                    </Stack>
                </PaperStyled>
            </Center>
        </Stack>
    );
}

export default TeacherHomework;