import {useEffect, useRef, useState} from 'react';
import {
    Stepper,
    Button,
    Group,
    Accordion,
    Text,
    Stack,
    Title,
    TextInput,
    Mark,
    Flex,
    Center,
    Paper,
    Checkbox
} from "@mantine/core";
import {Option, SingleOptionQuestionProp} from "./Types/TestTypes";


function SingleOptionQuestion(
    prop: SingleOptionQuestionProp
) {

    const [value, setValue] = useState<Option | null>(prop.initialValue)

    useEffect(() => {
        if(value !== null) {
            prop.onValueUpdate(value)
        }
    }, [value])

    useEffect(() => {
        setValue(prop.initialValue)
    }, [prop])


    return (


        <Checkbox.Group
            orientation="vertical"
            label={prop.exercise}
            description={prop.hint}
            value={value === null ? [] : [value.optionId]}
            onChange={e => {
                if (e.length === 0) {
                    setValue(null)
                }
                else if(e.length === 1) {
                    const val = prop.options.filter(x=> x.optionId === e[0])[0]
                    setValue(val)
                }
                else {
                    const val = prop.options.filter(x=> x.optionId === e[1])[0]
                    setValue(val)
                }
            }}
        >
            {
                prop.options.map(
                    (option) => <Checkbox key={option.optionId} id={option.optionId} value={option.optionId} label={option.text}/>
                )
            }
        </Checkbox.Group>

        // <Paper shadow="xl" p="xl" withBorder>
        //     {/*<Title order={2}>{singleOptionQuestion.exercise}</Title>*/}
        //     {/*<Text>{singleOptionQuestion.hint}</Text>*/}
        //     {/*<Stack>*/}
        //     {/*    {*/}
        //     {/*        singleOptionQuestion.options.map(*/}
        //     {/*            (option) => <Checkbox label={option}/>*/}
        //     {/*        )*/}
        //     {/*    }*/}
        //     {/*</Stack>*/}
        //     <Checkbox.Group
        //         orientation="vertical"
        //         label={singleOptionQuestion.exercise}
        //         description={singleOptionQuestion.hint}
        //         value={value === null ? [] : [value]}
        //         onChange={e => {
        //             if (e.length === 0) {
        //                 setValue(null)
        //             }
        //             else {
        //                 setValue(e[e.length - 1])
        //             }
        //         }}
        //     >
        //         {
        //             singleOptionQuestion.options.map(
        //                 (option) => <Checkbox value={option} label={option}/>
        //             )
        //         }
        //     </Checkbox.Group>
        // </Paper>
    );
}


export default SingleOptionQuestion;
