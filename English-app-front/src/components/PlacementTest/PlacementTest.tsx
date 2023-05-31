import i18n from "i18next";
import {useEffect, useState} from "react";
import {Center, Select, Text} from "@mantine/core";
import {StudentGradeProp} from "../TeacherComponents/GradePicker/GradePicker";
import {publicAxios} from "../../common/Api/PublicAxios";
import {TestQuestionProp} from "../Tests/Types/TestTypes";
import {TEST_QUESTIONS_KEY} from "../Tests/Consts";
import TestingProcessor from "../Tests/TestingProcessor";
import {PaperStyled} from "../TeacherComponents/Profile/styles";

export interface PlacementTestProp {
    onFinish: () => void
}

function PlacementTest(prop: PlacementTestProp) {

    const [questions, setQuestions] = useState<TestQuestionProp[]>([])
    const [questionLoaded, setQuestionLoaded] = useState<boolean>(false)

    const loadQuestions = () => {
        publicAxios.get("profileApi/entranceTest")
            .then(x => {
                setQuestions((x.data.data as unknown) as TestQuestionProp[])
                localStorage.setItem(TEST_QUESTIONS_KEY, JSON.stringify((x.data.data as unknown) as TestQuestionProp[]))
                setQuestionLoaded(true)
            })
    }

    useEffect(()=>{
        loadQuestions()
    }, [])

    return (
        <>
                <Center>
                    <PaperStyled shadow="xl" radius="xl" p="xl">
                    {questionLoaded &&
                    <TestingProcessor goToNextStep={prop.onFinish}/>
                    }
                    </PaperStyled>
                </Center>
        </>
    );
}

export default PlacementTest;
