import {
    AppShell,
    Burger,
    Button,
    Divider,
    Flex,
    Footer, Group,
    Header,
    Center,
    MediaQuery,
    Navbar, Stack,
    Text,
    Alert,
    useMantineTheme, Title, Modal
} from "@mantine/core";
import {withTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import StudentPlanClass from "../../components/Calendar/Calendar";
import Cards from "../../components/Cards/Cards";
import {SvgIcon} from "../../common/SvgIcon";
import Profile from "../../components/Profile/Profile";
import SideBarImage from "../../components/SideBar/SideBarImage";
import {useHistory} from "react-router-dom";
import {
    getRegistrationRole,
    getTokenPair,
    RegistrationRole,
    TokenPairType
} from "../../common/Auth/LocalStorageService";
import {
    BALANCE_ACTION,
    GetMenuResponse,
    HOMEWORK_ACTION,
    LESSONS_ACTION,
    PARENT_PROFILE_ACTION, PLACEMENT_TEST_ACTION,
    PLAN_CLASS_ACTION,
    PROFILE_ACTION, TEACHER_CLASS_ACTION, TEACHER_HOMEWORK_ACTION, TEACHER_PROFILE_ACTION, TO_INFORMATION
} from "./consts";
import authAxios from "../../common/Api/AuthAxios";
import Homework from "../../components/Homework/Homework";
import i18n from "i18next";
import ParentProfile from "../../components/ParentComponents/Profile/ParentProfile";
import YesNoBanner from "../../components/Banner/YesNoBanner";
import {TOKEN_PAIR_KEY} from "../../common/Auth/Consts";
import TeacherProfile from "../../components/TeacherComponents/Profile/TeacherProfile";
import TeacherHomework from "../../components/TeacherComponents/Homework/TeacherHomework";
import Container from "../../common/Container";
import {Label, LanguageSwitch, LanguageSwitchContainer} from "../../components/Footer/styles";
import Balance from "../../components/Balance/Balance";
import {IconAlertCircle} from "@tabler/icons";
import {Size, useWindowSize} from "../../hooks/useWindowSize";
import Information from "../../components/Information/Information";
import PlacementTest from "../../components/PlacementTest/PlacementTest";
import {INFO_LINE} from "../../config";
import TeacherClass from "../../components/TeacherComponents/TeacherClass/TeacherClass";
import {useForceUpdate} from "@mantine/hooks";
import {PromocodeCards} from "../../components/Balance/PromocodeCards";
import {OurTeachers} from "../../components/TeachersCarousel/OurTeachers";
import SearchTeacher from "../../components/SearchTeacher/SearchTeacher";
import NewStudentsList from "../../components/TeacherComponents/NewStudentsList/NewStudentsList";

const Lk = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const [currentAction, setCurrentAction] = useState<string>(PROFILE_ACTION)
    const [menu, setMenu] = useState<GetMenuResponse>()
    const size: Size = useWindowSize();
    const [isPromocodeActivated, setIsPromocodeActivated] = useState(false)

    const history = useHistory();


    // translations
    // const download = i18n.language === "en" ? "user consent" : "пользовательское соглашение";
    // const persanalManager = i18n.language === "en" ? "Your manager:" : "Персональный менеджер:";
    // const contact = i18n.language === "en" ? "Contact" : "Связаться";
    const promocodeTitle = i18n.language === "en" ? "Activate Promo" : "Активировать промкод";

    const handleChange = (language: string) => {
        i18n.changeLanguage(language);
    };
    const handleDownload = () => {
        window.location.href = "docs/Soglashenie1.doc"
    }

    const handleContactManager = () => {
        window.location.href = "https://t.me/alexandr_speakfastru"
    }

    useEffect(() => {
        const tokenPair: TokenPairType | null = getTokenPair()
        if (tokenPair === null) {
            history.replace("/")
            // Есть access_token
        }
    }, [history])

    useEffect(() => {
        if (menu?.currentFrame.action)
            setCurrentAction(menu?.currentFrame.action)
    }, [menu])

    useEffect(() => {
        authAxios.get("/menuApi/getMenu").then(x => {
            if (x.data.success) {
                setMenu(x.data.data as GetMenuResponse)
                //console.log(x.data.data)
                const action = menu?.currentFrame.action
                if (action !== undefined)
                    setCurrentAction(action)
            }
        })
    }, [])

    //console.log(menu)

    const handleOnButtonClick: (action: string) => void = (action) => {
        setCurrentAction(action)
        authAxios.post("/menuApi/updateFrame", {
            action: action
        }).then(() => setOpened(false))
    }

    const handleLogout = () => {
        localStorage.removeItem(TOKEN_PAIR_KEY)
        history.replace("/")
    }

    //console.log(menu)

    const [openHomeworkModal, setOpenHomeworkModal] = useState(false)
    const [openTeachersModal, setOpenTeachersModal] = useState(false)
    const [openNewStudents, setOpenNewStudents] = useState(false)

    const role: RegistrationRole = getRegistrationRole()

    return (
        <>
            <Modal
                centered
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title={promocodeTitle}
            >
                <PromocodeCards onPromocodeActivated={(activated)=>{
                    if (activated) {
                        setIsPromocodeActivated(true)
                        setModalOpened(false)
                    }
                }}/>
            </Modal>

            <Modal
                size="60%"
                centered
                opened={openHomeworkModal}
                onClose={() => setOpenHomeworkModal(false)}
                title={"Сдать домашнее задание"}
            >
                <Homework/>
            </Modal>

            <Modal
                size="60%"
                centered
                opened={openNewStudents}
                onClose={() => setOpenNewStudents(false)}
                title={"Запросы новых учеников"}
            >
                <NewStudentsList/>
            </Modal>

            <Modal
                size="70%"
                centered
                opened={openTeachersModal}
                onClose={() => setOpenTeachersModal(false)}
                title={"Просмотр учителей"}
            >
                <SearchTeacher/>
            </Modal>
            {/*<Row justify="center" align="middle">*/}
            {/*    <Col lg={10} md={10} sm={10} xs={10}>*/}
            {/*        <LoginComponent/>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            <AppShell
                styles={{
                    main: {
                        background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
                        // background: "center / contain no-repeat url(/img/jpg/UkFlag.jpg);"
                    },
                }}
                navbar={
                    <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{sm: 200, lg: 300}}>
                        <Navbar.Section>

                            <SideBarImage/>
                        </Navbar.Section>
                        {/*<Text>Application navbar</Text>*/}
                        {/*<Navbar.Section>*/}
                        {/*  <Text>hello this is tittle</Text>*/}
                        {/*</Navbar.Section>*/}
                        <Navbar.Section grow={size.width !== undefined && size.width > 768} mt="md">
                            <div style={{display: "flex", flexDirection: "column"}}>

                                {/*<Text component={Link}  variant="link" to="/">*/}
                                {/*   Home Page*/}
                                {/*</Text>*/}
                                {/*<Text component={Link}  variant="link" to="/input">*/}
                                {/*   Input Example*/}
                                {/*</Text>*/}

                                {/*<Text component={Link}  variant="link" to="/titlePage">*/}
                                {/*   Title Page*/}
                                {/*</Text>*/}
                                {/*<Text component={Link}  variant="link" to="/cardsPage">*/}
                                {/*   Cards Page*/}
                                {/*</Text>*/}
                                {/*<Text component={Link}  variant="link" to="/CalendarExample">*/}
                                {/*CalendarExample*/}
                                {/*</Text>*/}
                                {/*<Stack>*/}


                                {/*{(menu !== undefined && menu.isShowProfile) &&*/}
                                {/*<Button*/}
                                {/*    variant="light"*/}
                                {/*    onClick={(e) => {*/}
                                {/*        setCurrentState(PROFILE)*/}
                                {/*        setOpened(false)*/}
                                {/*    }} leftIcon={<IconUserCircle/>}>Профиль</Button>*/}
                                {/*}*/}
                                {/*{(menu !== undefined && menu.isShowLessons) &&*/}
                                {/*<Button*/}
                                {/*    variant="light"*/}
                                {/*    onClick={(e) => {*/}
                                {/*        setCurrentState(LESSONS)*/}
                                {/*        setOpened(false)*/}
                                {/*    }} leftIcon={<IconSchool/>}>Уроки</Button>*/}
                                {/*}*/}
                                {/*{(menu !== undefined && menu.isShowHomework) &&*/}
                                {/*<Button variant="light" onClick={(e) => {*/}
                                {/*    setCurrentState(HOMEWORK)*/}
                                {/*    setOpened(false)*/}
                                {/*}}  leftIcon={<IconHomeEdit/>}>Домашнее задание</Button>*/}
                                {/*}*/}
                                {/*{(menu !== undefined && menu.isShowPlanClass) &&*/}
                                {/*<Button variant="light" onClick={(e) => {*/}
                                {/*    setCurrentState(PLAN_CLASS)*/}
                                {/*    setOpened(false)*/}
                                {/*}} leftIcon={<IconCalendarTime/>}>Запланировать занятие</Button>*/}
                                {/*}*/}
                                {/*{(menu !== undefined && menu.isShowProgress) &&*/}
                                {/*<Button variant="light" leftIcon={<IconTrendingUp/>}>Прогресс</Button>*/}
                                {/*}*/}


                                {(menu !== undefined && menu.classesPrepaid) &&
                                    <>
                                        <Stack>
                                            <Divider/>
                                            <Stack>
                                                <Center>
                                                    <Text>{menu.classesPrepaid}</Text>
                                                    <Button
                                                        sx={{marginLeft: '10px'}}
                                                        variant="outline"
                                                        radius="xl"
                                                        onClick={() => {
                                                            setCurrentAction(BALANCE_ACTION)
                                                            setOpened(false)
                                                        }}
                                                        size="xs" compact>
                                                        Пополнить
                                                    </Button>
                                                </Center>

                                                <Center>
                                                    {(menu.yourEnglishLevel !== undefined && menu.yourEnglishLevel !== null)
                                                        ?
                                                        <Text>Ваш уровень: {menu.yourEnglishLevel}</Text>
                                                        :
                                                        <>
                                                            <Text>Ваш уровень: неизвестно</Text>
                                                            <Button
                                                                sx={{marginLeft: '10px'}}
                                                                variant="outline"
                                                                radius="xl"
                                                                onClick={() => {
                                                                    setCurrentAction(PLACEMENT_TEST_ACTION)
                                                                    setOpened(false)
                                                                }}
                                                                size="xs" compact>
                                                                Тест
                                                            </Button>
                                                        </>
                                                    }
                                                </Center>

                                            </Stack>
                                            <Divider/>
                                        </Stack>
                                    </>
                                }

                                {
                                    menu?.menuItems.filter(x => x.order !== 1 && x.order !== 4).map((item) => {
                                       return <Button
                                            key={item.order}
                                            variant="light"
                                            onClick={() => handleOnButtonClick(item.action)}
                                            // leftIcon={TablerFactory({
                                            //     tablerName: item.tablerIcon
                                            // })}
                                        >{
                                            i18n.language === "en" ? item.nameEn : item.name
                                        }</Button>
                                    })
                                }
                                {/*{ role === RegistrationRole.Student &&*/}
                                {/*    <Button*/}
                                {/*    variant="light"*/}
                                {/*    onClick={() => {setOpenHomeworkModal(true)}}*/}
                                {/*    // leftIcon={TablerFactory({*/}
                                {/*    //     tablerName: item.tablerIcon*/}
                                {/*    // })}*/}
                                {/*>Домашнее задание</Button>}*/}
                                { role === RegistrationRole.Teacher &&
                                    <Button
                                    variant="light"
                                    onClick={() => {setOpenNewStudents(true)}}
                                    // leftIcon={TablerFactory({
                                    //     tablerName: item.tablerIcon
                                    // })}
                                >Новые ученики</Button>}
                                { role === RegistrationRole.Student &&
                                    <Button
                                        variant="light"
                                        onClick={() => {setOpenTeachersModal(true)}}
                                        // leftIcon={TablerFactory({
                                        //     tablerName: item.tablerIcon
                                        // })}
                                    >Другие Учителя</Button>}
                                {
                                    role !== RegistrationRole.Teacher && role !== RegistrationRole.Parent &&
                                    <Button
                                        variant="light"
                                        onClick={() => {setModalOpened(true)}}
                                        // leftIcon={TablerFactory({
                                        //     tablerName: item.tablerIcon
                                        // })}
                                    >{promocodeTitle}</Button>
                                }
                                {(menu !== undefined && menu.yesNoBanner) &&
                                    <YesNoBanner
                                        id={menu.yesNoBanner.id}
                                        question={menu.yesNoBanner.question}
                                        url={menu.yesNoBanner.url}
                                        questionEn={menu.yesNoBanner.questionEn}
                                        userId={menu.yesNoBanner.userId}/>
                                }


                                {/*</Stack>*/}
                                {/*    <SideBarImage/>*/}
                            </div>
                        </Navbar.Section>
                    </Navbar>
                }
                footer={
                    <Footer height={70} p="md">
                        <Stack>
                            <Group position={"apart"}>
                                <Group>
                                    <Button color="red" onClick={handleLogout}>Выйти</Button>
                                    <LanguageSwitchContainer>
                                        <LanguageSwitch onClick={() => handleChange("en")}>
                                            <SvgIcon
                                                src="united-states.svg"
                                                aria-label="homepage"
                                                width="30px"
                                                height="30px"
                                            />
                                        </LanguageSwitch>
                                        <LanguageSwitch onClick={() => handleChange("es")}>
                                            <SvgIcon
                                                src="Flag_of_Russia.svg"
                                                aria-label="homepage"
                                                width="30px"
                                                height="30px"
                                            />
                                        </LanguageSwitch>
                                    </LanguageSwitchContainer>
                                </Group>
                                {/*<Button variant="outline">2</Button>*/}
                                {/*<Button variant="outline">3</Button>*/}
                                {/*<Group position="right">*/}
                                {/*    <Text>{INFO_LINE}</Text>*/}
                                {/*    <Button variant={"light"} onClick={handleDownload}>{download}</Button>*/}
                                {/*</Group>*/}
                            </Group>
                        </Stack>
                    </Footer>
                }
                header={
                    <Header height={{base: 50, md: 70}} p="md">
                        <div style={{display: 'flex', justifyContent: "space-between"}}>
                            {/* div style={{ display: 'flex', alignItems: 'center', height: '100%' */}
                            <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                    mr="xl"
                                />
                            </MediaQuery>

                            <SvgIcon src="logo.svg" width="101px" height="34px"/>

                        </div>
                    </Header>
                }
            >
                {/*<Routes>*/}
                {/*    <Route path="/" element={<ChipsExample/>}></Route>*/}
                {/*    <Route path="/input" element={<InputExample/>}></Route>*/}
                {/*    <Route path="/ChipsExample" element={<TitleAndTextExample/>}></Route>*/}
                {/*    <Route path="/cardsPage" element={<Cards/>}></Route>*/}
                {/*    <Route path="/CalendarExample" element={<CalendarExample/>}></Route>*/}


                {/*</Routes>*/}
                {/* <TableExample/> */}
                {currentAction === PROFILE_ACTION &&
                    <Profile/>
                }
                {currentAction === LESSONS_ACTION &&
                    <Cards/>
                }
                {currentAction === HOMEWORK_ACTION &&
                    <Homework/>
                }
                {currentAction === PLAN_CLASS_ACTION &&
                    <StudentPlanClass/>
                }
                {currentAction === BALANCE_ACTION &&
                    <Balance isPromocodeActivated={isPromocodeActivated}/>
                }
                {currentAction === PARENT_PROFILE_ACTION &&
                    <ParentProfile/>
                }
                {currentAction === TEACHER_PROFILE_ACTION &&
                    <TeacherProfile/>
                }
                {currentAction === TEACHER_HOMEWORK_ACTION &&
                    <TeacherHomework/>
                }
                {currentAction === TO_INFORMATION &&
                    <Information/>
                }
                {currentAction === PLACEMENT_TEST_ACTION &&
                    <PlacementTest onFinish={() => setCurrentAction(PROFILE_ACTION)}/>
                }
                {currentAction === TEACHER_CLASS_ACTION &&
                    <TeacherClass/>
                }
            </AppShell>
        </>
    );
};

export default withTranslation()(Lk);
