import {Chip} from '@mantine/core';
import {useEffect, useState} from "react";
import {RegistrationChipProps} from "../ContactForm/types";
import i18n from "i18next";
import {useStyles} from "./styles";
import {IS_PARENT_ROLE_BLOCKED, IS_ROLE_CHOICE_UPON_REGISTRATION, IS_TEACHER_ROLE_BLOCKED} from "../../config";


import {Tabs, TabsProps, Text} from '@mantine/core';
import {IconPhoto, IconMessageCircle, IconSettings} from '@tabler/icons';

function StyledTabs(props: TabsProps) {
    return (
        <Tabs
            unstyled
            styles={(theme) => ({
                tab: {
                    ...theme.fn.focusStyles(),
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
                    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4]}`,
                    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                    cursor: 'pointer',
                    fontSize: theme.fontSizes.sm,
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: '1',

                    '&:disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                    },

                    '&:not(:first-of-type)': {
                        borderLeft: 0,
                    },

                    '&:first-of-type': {
                        borderTopLeftRadius: theme.radius.md,
                        borderBottomLeftRadius: theme.radius.md,
                    },

                    '&:last-of-type': {
                        borderTopRightRadius: theme.radius.md,
                        borderBottomRightRadius: theme.radius.md,
                    },

                    '&[data-active]': {
                        backgroundColor: '#2e186a',
                        borderColor: '#2e186a',
                        color: theme.white,
                    },
                },

                tabIcon: {
                    marginRight: theme.spacing.xs,
                    display: 'flex',
                    alignItems: 'center',
                },

                root: {
                    display: 'flex',
                    width: '100%',
                },

                tabsList: {
                    display: 'flex',
                    flexGrow: 1,
                },
            })}
            {...props}
        />
    );
}

function RolePickerChips({onValueChanged}: RegistrationChipProps) {
    // Student = 0, Teacher = 1, Parent = 2
    // const [value, setValue] = useState('0');

    // student, teacher, parent
    const [tabValue, setTabValue] = useState("student")

    useEffect(() => {
        if (tabValue) {
            switch (tabValue) {
                case "student":
                    onValueChanged('0')
                    break;
                case "teacher":
                    onValueChanged('1')
                    break;
                case "parent":
                    onValueChanged('2')
                    break;
            }
        }
    }, [tabValue, onValueChanged])

    // useEffect(() => {
    //     onValueChanged(value)
    // }, [value, onValueChanged])

    // translation
    const studentLine = i18n.language === "en" ? "student" : "студент";
    const teacherLine = i18n.language === "en" ? "teacher" : "преподаватель";
    const parentLine = i18n.language === "en" ? "parent" : "родитель";


    return (
        <>
            {IS_ROLE_CHOICE_UPON_REGISTRATION &&


            <Tabs radius="xl" variant={"pills"} value={tabValue} onTabChange={(value) => {
                if (value) {
                    setTabValue(value)
                }

            }}>
                <Tabs.List grow>
                    <Tabs.Tab color={"red.6"} value="student">
                        <Text fz="xl">{studentLine}</Text>
                    </Tabs.Tab>
                    <Tabs.Tab color={"red.6"} value="teacher">
                        {/*disabled={IS_TEACHER_ROLE_BLOCKED}*/}
                        <Text fz="xl">{teacherLine}</Text>
                    </Tabs.Tab>
                    <Tabs.Tab color={"red.6"} value="parent">
                        {/*disabled={IS_PARENT_ROLE_BLOCKED}*/}
                        <Text fz="xl">{parentLine}</Text>
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>
            }
        </>
    );
}

export default RolePickerChips;
