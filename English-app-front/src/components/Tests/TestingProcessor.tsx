import {
    Option,
    SingleOptionQuestionProp,
    TestAnswers, TestingProcessorProp,
    TestQuestionProp,
    TestQuestionPropWrapper
} from "./Types/TestTypes";
import {useEffect, useState} from "react";
import {Button, Checkbox, Flex, Stack, Text} from "@mantine/core";
import SingleOptionQuestion from "./SingleOptionQuestion";
import {SINGLE_OPTION_QUESTION_KEY, TEST_ANSWERS_KEY, TEST_QUESTIONS_KEY} from "./Consts";
import i18n from "i18next";
import authAxios from "../../common/Api/AuthAxios";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons";
import {showFailureNotification, showSuccessNotification} from "../Notification/NotificationManager";

/**
 * Класс, который отвечает за отрисовку и обработку тестовых вопросов
 * разных типов
 * @param prop
 * @constructor
 */
function TestingProcessor(prop: TestingProcessorProp) {
    const [data, setData] = useState(JSON.parse(localStorage.getItem(TEST_QUESTIONS_KEY) as string))
    // Тип вопроса
    const [typeNameState, setTypeNameState] = useState(data.questions[0].type)
    // Порядковый номер вопроса в тесте
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)
    // Завершен ли тест
    const [isTestOver, setIsTestOver] = useState<boolean>(false)
    // Выбранные пользователем ответы
    const [pickedAnswers, setPickedAnswers] = useState<Option[]>([])
    // Результат теста
    const [testResult, setTestResult] = useState<string>("")

    // Переводы
    const nextButtonHolder = i18n.language === "en" ? "Next" : "Далее"
    const prevButtonHolder = i18n.language === "en" ? "Back" : "Назад"
    const completeButtonHolder = i18n.language === "en" ? "Complete" : "Завершить"
    const answersAccepted = i18n.language === "en" ? "Answers accepted" : "Ответы приняты"
    const answersNotAccepted = i18n.language === "en" ? "Unfortunately, answers are not saved." : "К сожалению, ответы не приняты"
    const finalResultTextPart1 = i18n.language === "en" ? "Your score is " : "Ваш результат "
    const finalResultTextPart2 = i18n.language === "en" ? " out of " : " из "
    const finalResultTextPart3 = i18n.language === "en" ? " points. Proposed level is " : " баллов, прогнозируемый уровень "


    useEffect(() => {console.log(`pricked answers ${JSON.stringify(pickedAnswers)}`)}, [pickedAnswers])

    useEffect(()=> {
        if(isTestOver) {
            const testData = JSON.parse(localStorage.getItem(TEST_QUESTIONS_KEY) as string)
            authAxios.post("/testApi/completeTest", testData)
                .then(x => {
                    showSuccessNotification(answersAccepted)
                    setTestResult(
                        finalResultTextPart1
                        +
                        x.data.data.studentScore
                        +
                        finalResultTextPart2
                        +
                        x.data.data.maxScore
                        +
                        finalResultTextPart3
                        +
                        x.data.data.level
                        +
                        "."
                    )
                    localStorage.removeItem(TEST_QUESTIONS_KEY)
                })
                .catch(x => showFailureNotification(answersNotAccepted))
        }
    }, [isTestOver])

    // Восстанавливаем сохраненные ответы пользователя
    useEffect(() => {
        const testData = JSON.parse(localStorage.getItem(TEST_QUESTIONS_KEY) as string)
        setData(testData)
        const type = testData.questions[currentQuestionNumber].type
        if (type === SINGLE_OPTION_QUESTION_KEY) {
            const selectedOptions = testData.questions[currentQuestionNumber].selectedOption
            setPickedAnswers(selectedOptions)
        }
    }, [currentQuestionNumber])


    const updateAnswerOptions = (options: Option) => {
        setPickedAnswers([options])
    }



    const nextButtonClicked = () => {
        const testData = JSON.parse(localStorage.getItem(TEST_QUESTIONS_KEY) as string)
        // Пользователь выбрал какие-то ответы
        if (pickedAnswers.length > 0) {
            testData.questions[currentQuestionNumber].selectedOption = pickedAnswers
            localStorage.setItem(TEST_QUESTIONS_KEY, JSON.stringify(testData))
        }
        if (currentQuestionNumber + 1 >= testData.questions.length) {
            setIsTestOver(true)
        } else {
            setCurrentQuestionNumber(currentQuestionNumber + 1)
        }
    }

    const backButtonClicked = () => {
        if(currentQuestionNumber > 0) {
            if (pickedAnswers.length > 0) {
                const testData = JSON.parse(localStorage.getItem(TEST_QUESTIONS_KEY) as string)
                testData.questions[currentQuestionNumber].selectedOption = pickedAnswers
                localStorage.setItem(TEST_QUESTIONS_KEY, JSON.stringify(testData))
            }
            setCurrentQuestionNumber(currentQuestionNumber - 1)
        }
    }

    return (
        <div>
            {
                (!isTestOver && data.questions[currentQuestionNumber] !== null && data.questions[currentQuestionNumber].type === SINGLE_OPTION_QUESTION_KEY) &&
                <SingleOptionQuestion
                    exercise={
                        data.questions[currentQuestionNumber].text
                    }
                    hint={
                        data.questions[currentQuestionNumber].hint
                    }
                    options={
                        data.questions[currentQuestionNumber].options
                    }
                    questionId={
                        data.questions[currentQuestionNumber].questionId
                    }
                    onValueUpdate={updateAnswerOptions} initialValue={
                        pickedAnswers.length > 0 ? pickedAnswers[0] : null
                }/>
            }
            {!isTestOver &&
            <Flex
                mih={50}
                gap="xl"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
            >
                <Button variant="default" onClick={backButtonClicked}>{prevButtonHolder}</Button>
                <Button onClick={nextButtonClicked}>{nextButtonHolder}</Button>
            </Flex>
            }
            {isTestOver &&
                <Stack>
                    <Text fz="xl">{testResult}</Text>
                    <Button onClick={prop.goToNextStep}>{completeButtonHolder}</Button>
                </Stack>

            }
        </div>
    )
}


export default TestingProcessor;

