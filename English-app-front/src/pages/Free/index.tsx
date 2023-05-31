import {withTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import i18n from "i18next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Accordion, Alert, Button, Center, Divider, List, Text, Title, Tooltip} from "@mantine/core";
import Container3 from "../../common/Container3";
import {BackgroundStyled, MantinePaperStyled, StackStyled} from "./styles";
import {IconAlertCircle} from "@tabler/icons";
import Countdown from "react-countdown";
import {publicAxios} from "../../common/Api/PublicAxios";
import {StudentData} from "../../components/TeacherComponents/Profile/TeacherProfile";
import {useHistory} from "react-router-dom";


const ready = i18n.language === "en" ? "Promo action is completed" : "Розыгрыш завершен";
// Random component
const Completionist = () => <Text>{ready}</Text>;

// Renderer callback with condition
// @ts-ignore
const renderer = ({days, hours, minutes, seconds, completed}) => {
    if (completed) {
        // Render a completed state
        return <Completionist/>;
    } else {
        // Render a countdown
        return <Title color="dark.3">{days}:{hours}:{minutes}:{seconds}</Title>;
    }
};

export interface FreeHalfAYear {
    numberOfParticipants: number
}

const Free = () => {

    const promo = i18n.language === "en" ? "Unprecedented promo action" : "Беспрецедентная акция";
    const [freeHalfAYear, setFreeHalfAYear] = useState<FreeHalfAYear | null>(null)
    const history = useHistory()

    useEffect(() => {
        publicAxios.get("/free/getData").then(x => {
                if (x.data.success) {
                    setFreeHalfAYear(x.data.data as FreeHalfAYear)
                }
            }
        )
    }, [])

    return (
        <>
            <BackgroundStyled>
            <Header/>

                <Center>
                    <MantinePaperStyled shadow="xs" radius="xl" p="xl">
                        <StackStyled>
                            <Alert icon={<IconAlertCircle size={90}/>}
                                   title={<Text size={"xl"}>Полгода бесплатный занятий!</Text>}>
                                <Text size={"xl"}>Мы разыгрываем полгода бесплатных занятий.</Text>
                                <Text size={"xl"}>Чтобы принять участие, нужно выполнить несколько простых шагов:</Text>
                                <List>
                                    <List.Item><Text size={"xl"}>Зарегистрируйтесь и пройдите
                                        анкетирование</Text></List.Item>
                                    <List.Item><Text size={"xl"}>Назначьте занятие и проведите оплату</Text></List.Item>
                                    <List.Item><Text size={"xl"}>Ожидайте объявления результатов</Text></List.Item>
                                </List>

                            </Alert>
                            <Divider/>

                            <Alert icon={<IconAlertCircle size={16}/>} color="violet" radius="xs"
                                   title={<Text size={"xl"}>Статистика</Text>}>
                                <List>
                                    <List.Item><Text size={"xl"}>Экономия победителей: 90 000 руб.</Text></List.Item>
                                    <List.Item><Text size={"xl"}>Количество победителей: 20 человек.</Text></List.Item>
                                    <List.Item><Text size={"xl"}>На текущий момент
                                        участников: {freeHalfAYear?.numberOfParticipants} человек.</Text></List.Item>
                                    <List.Item>
                                        <Text size={"xl"}>Вероятность победы на текущий момент: {(freeHalfAYear !== undefined && freeHalfAYear?.numberOfParticipants !== undefined && freeHalfAYear?.numberOfParticipants < 20) ? 100 : 20 / (freeHalfAYear?.numberOfParticipants ?? 20) * 100}%.</Text>
                                        <Tooltip
                                            events={{ hover: true, focus: true, touch: true }}
                                            multiline
                                            label={
                                            i18n.language === "en" ? "Unprecedented promo action" : `Вероятность есть отношения победителей ко всем участникам. 
                                                Если участников меньше, чем количество победителей, то вероятность победы 100%. 
                                                В данном случае вероястность равна ${(freeHalfAYear !== undefined && freeHalfAYear?.numberOfParticipants !== undefined && freeHalfAYear?.numberOfParticipants < 20) ? '100%, поскольку участников меньше, чем победителей' : `20 / ${freeHalfAYear?.numberOfParticipants} * 100 = ${20 / (freeHalfAYear?.numberOfParticipants ?? 20) * 100}`}.
                                                Обращаем внимание, что вероятность может измениться из-за появления новых участников.`
                                        }>
                                            <Button
                                                variant={"outline"}
                                                radius={"xl"}>Как считается
                                                вероятность?</Button>
                                        </Tooltip>
                                    </List.Item>

                                    <List.Item><Text size={"xl"}>Столько осталось времени до подведения
                                        итогов: <Countdown renderer={renderer} date={1679709614000}/></Text></List.Item>
                                </List>

                            </Alert>

                            <Button
                                size={"xl"}
                                onClick={() => history.push("/login")}
                                radius={"xl"}
                                variant="gradient" gradient={{from: 'orange', to: 'red'}}>Попробовать</Button>
                            <Divider h={"md"}/>
                            <Text size={"xl"}>Часто задаваемые вопросы</Text>

                            <Accordion variant="separated" radius="xl">
                                <Accordion.Item value="customization">
                                    <Accordion.Control><Text size={"xl"}> Как я узнаю
                                        результаты? </Text></Accordion.Control>
                                    <Accordion.Panel><Text size={"xl"}> Вам придет письмо на почту, а также менеджер
                                        свяжется с Вами в удобное время. </Text></Accordion.Panel>
                                </Accordion.Item>

                                <Accordion.Item value="flexibility">
                                    <Accordion.Control><Text size={"xl"}>Можно ли участвовать, не оплатив
                                        заниятие</Text></Accordion.Control>
                                    <Accordion.Panel><Text size={"xl"}> К сожалению, розыгрыш проводится только среди
                                        учеников нашей школы. </Text> </Accordion.Panel>
                                </Accordion.Item>

                                <Accordion.Item value="focus-ring">
                                    <Accordion.Control><Text size={"xl"}>Если мне не понравится учитель, смогу ли я его
                                        поменять?</Text></Accordion.Control>
                                    <Accordion.Panel><Text size={"xl"}>Да, вы сможете заменить
                                        учителя.</Text></Accordion.Panel>
                                </Accordion.Item>
                            </Accordion>
                        </StackStyled>
                    </MantinePaperStyled>
                </Center>
                <Footer/>
            </BackgroundStyled>
        </>
    );
};

export default withTranslation()(Free);
