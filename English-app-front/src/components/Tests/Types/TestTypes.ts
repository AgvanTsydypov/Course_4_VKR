
export interface Option {
    optionId: string,
    text: string
}

export interface SingleOptionQuestionProp {
    questionId: string,
    exercise: string,
    hint: string,
    options: Option[],
    onValueUpdate: (newValue: Option) => void,
    initialValue: Option | null
}

export interface TestQuestionProp {
    id: string
    optionId: string[],
    typeName: string,
    question: any,
}

export interface TestQuestionPropWrapper {
    data: TestQuestionProp[]
}

export interface TestAnswers {
    answers: QuestionAnswer[]
}

export interface QuestionAnswer {
    questionId: string,
    answersId: string[]
}

export interface TestingProcessorProp {
    goToNextStep: () => void
}
