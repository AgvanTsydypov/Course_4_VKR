import {Accordion, Alert, Button, Center, Stack, Title} from '@mantine/core';
import {PaperStyled} from "./styles";
import i18n from "i18next";
import {useEffect, useState} from "react";
import authAxios from "../../common/Api/AuthAxios";
import HomeworkTopicPicker, {TopicData} from "../TeacherComponents/TopicPicker/HomeworkTopicPicker";
import {RichTextEditor} from "@mantine/rte";
import {showFailureNotification, showSuccessNotification} from "../Notification/NotificationManager";
import {IconAlertCircle} from "@tabler/icons";
import login from "../../pages/Login";

export interface StudentHomeworkAllData {
    grade?: number,
    isSubmitted: boolean,
    topic: TopicData,
    homework: string,
    deadline: string,
    feedBack: string
}

function Homework() {

    // translation
    const homeworkLine = i18n.language === "en" ? "Homework" : "Домашнее задание";
    const saveLine = i18n.language === "en" ? "Save" : "Сохранить";
    const submitLine = i18n.language === "en" ? "Submit to teacher" : "Отправить на проверку";
    const restoreLine = i18n.language === "en" ? "Restore initial" : "Вернуть изначальный вид";
    const deadlineLine = i18n.language === "en" ? "Deadline: before " : "Дедлайн: строго до ";
    const locale = i18n.language === "en" ? "en-US" : "ru-RU"

    const [studentHomeworkAllData, setStudentHomeworkAllData] = useState<StudentHomeworkAllData[]>([])
    const [studentDoingHomeworkPickedTopic, setStudentDoingHomeworkPickedTopic] = useState<string | null>(null)
    // текст из rte во вкладке, где студент делает домашку
    const [studentDoingHomework, onChangeStudentDoingHomework] = useState("");
    const [studentDoingHomeworkDeadline, setStudentDoingHomeworkDeadline] = useState<string>("")

    const [studentEvaluatedHomeworkPickedTopic, setStudentEvaluatedHomeworkPickedTopic] = useState<string | null>(null)

    useEffect(() => {
        authAxios.get(`/homeworkStudentApi/getAllData`).then(x => {
            if (x.data.success) {
                setStudentHomeworkAllData(x.data.data as StudentHomeworkAllData[])
            }
        })
    }, [])
    console.log(studentHomeworkAllData)
    // Наолнение стейтов связанных с текущими домашками
    useEffect(() => {
        const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
        const homeworkData = studentHomeworkAllData.filter(x => x.topic.topicName === studentDoingHomeworkPickedTopic)[0]
        if (homeworkData && homeworkData.homework) {
            onChangeStudentDoingHomework(() => homeworkData.homework)
        }
        if (homeworkData && homeworkData.deadline) {
            setStudentDoingHomeworkDeadline(new Date(homeworkData.deadline).toLocaleDateString(locale, options))
        }
    }, [studentHomeworkAllData, studentDoingHomeworkPickedTopic])

    const handleHomeworkSubmit = () => {
        authAxios.post(`homeworkStudentApi/submitHomework`, {
            topic: studentDoingHomeworkPickedTopic,
            homework: studentDoingHomework,
        }).then(x => {
            if (x.data.success) {
                showSuccessNotification("Сохранено")
            } else {
                showFailureNotification(x.data.reason)
            }
        }).catch(() => showFailureNotification("Something went wrong"))
    }

    //console.log(studentHomeworkAllData)

    return (
        <Center>
            <PaperStyled shadow="xl" radius="xl" p="xl">
                <Accordion chevronPosition="left" variant="contained">
                    <Accordion.Item value="do-new-hw">
                        <Accordion.Control>
                            Выполнить домашнее задание
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Stack>
                                {studentHomeworkAllData.filter(x => !x.isSubmitted).length > 0
                                    ?
                                    <HomeworkTopicPicker topics={
                                        studentHomeworkAllData.filter(x => !x.isSubmitted).map(x => x.topic)
                                    } onChoiceChanged={x => setStudentDoingHomeworkPickedTopic(x)} selfLoad={false}
                                                         isStudent={true}/>
                                    :
                                    <Alert variant="filled" icon={<IconAlertCircle size={16}/>} title="Пока нет новых домашек" color="gray">
                                        К сожалению, учитель пока не успел подготовить новые домашки
                                    </Alert>
                                }
                                {studentDoingHomework !== "" &&
                                <>
                                    <Title order={6}>{`${deadlineLine} ${studentDoingHomeworkDeadline}`}</Title>
                                    <RichTextEditor
                                        value={studentDoingHomework}
                                        onChange={onChangeStudentDoingHomework}
                                        id="rte"
                                    />
                                    <Button onClick={handleHomeworkSubmit}>Подтвердить</Button>
                                </>
                                }
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="archived-hw">
                        <Accordion.Control>
                            Проверенные домашнии работы
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Stack>
                                {studentHomeworkAllData.filter(x => x.grade != null).length > 0
                                    ?
                                    <HomeworkTopicPicker topics={
                                        studentHomeworkAllData.filter(x => x.grade != null).map(x => x.topic)
                                    } onChoiceChanged={x => setStudentEvaluatedHomeworkPickedTopic(x)} selfLoad={false}
                                                         isStudent={true}/>
                                    :
                                    <Alert variant="filled" icon={<IconAlertCircle size={16}/>} title="Пока нет проверенных домашек" color="gray">
                                        К сожалению, учитель пока не успел проверить ни одну домашку
                                    </Alert>
                                }
                                {(studentEvaluatedHomeworkPickedTopic !== undefined && studentEvaluatedHomeworkPickedTopic !== null) &&
                                <>
                                    <RichTextEditor
                                        value={studentHomeworkAllData.filter(x => x.topic.topicName === studentEvaluatedHomeworkPickedTopic)[0].homework +
                                    " Оценка: " + studentHomeworkAllData.filter(x => x.topic.topicName === studentEvaluatedHomeworkPickedTopic)[0].grade + "." + "\n" +
                                    " \nКомментарий: " + studentHomeworkAllData.filter(x => x.topic.topicName === studentEvaluatedHomeworkPickedTopic)[0].feedBack}
                                        id="rte"
                                        readOnly={true}
                                    />
                                </>
                                }
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </PaperStyled>
        </Center>

    );
}


export default Homework;
