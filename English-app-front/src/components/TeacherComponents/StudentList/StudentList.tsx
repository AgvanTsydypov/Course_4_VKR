import {useEffect, useState} from "react";
import {Select} from "@mantine/core";
import {StudentData} from "../Profile/TeacherProfile";
import i18n from "i18next";
import authAxios from "../../../common/Api/AuthAxios";

export interface StudentListProp {
    students: StudentData[]
    onChoiceChanged: (newChoice: StudentData) => void
    selfLoad: boolean
}

function StudentList(prop: StudentListProp) {

    // translations
    const pickStudent = i18n.language === "en" ? "Pick a student" : "Выберите студента"
    const pickOne = i18n.language === "en" ? "Pick one" : "Выберите одно"
    const notFound = i18n.language === "en" ? "Nothing found" : "Ничего не найдено"

    const [data, setData] = useState<string[]>([])
    const [value, setValue] = useState<string | null>(null);
    const [students, setStudents] = useState<StudentData[]>([])

    useEffect(() => {
        if (prop.selfLoad) {
            authAxios.get("/teacherProfileApi/getAllStudents").then(x => {
                    if (x.data.success) {
                        setStudents(x.data.data as StudentData[])
                    }
                }
            )
        } else {
            setStudents(prop.students)
        }
    }, [prop.students, prop.selfLoad])

    useEffect(() => {
        const student = students.filter(x => x.fio === value)[0]
        prop.onChoiceChanged(student)
    }, [value])

    useEffect(() => {
        setData(students.map(x => x.fio))
    }, [students, setStudents])

    return (
        <>
            <Select
                label={pickStudent}
                placeholder={pickOne}
                searchable
                nothingFound={notFound}
                data={data}
                value={value}
                onChange={setValue}
            />
        </>
    );
}

export default StudentList;
