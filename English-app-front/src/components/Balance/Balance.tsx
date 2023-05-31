import {Badge, Button, Card, Center, Col, Grid, Group, Image, Modal, Select, Space, Stack, Text} from '@mantine/core';
import {IconCheck, IconX} from "@tabler/icons";
import React, {useEffect, useState} from 'react';
import authAxios from "../../common/Api/AuthAxios";
import {showFailureNotification, showSuccessNotification} from "../Notification/NotificationManager";

import i18n from "i18next";
import {useHistory} from "react-router-dom";

export interface PaymentMethodData {
    title: string,
    description: string
    titleEn: string,
    descriptionEn: string
}

export interface OurPaymentMethods {
    listOfPaymentMethods: PaymentMethodData[]
}

export interface PaymentData {
    method: string,
    extraData?: OurPaymentMethods,
    isWelcomePromocodeActive: boolean
}

export interface ConfirmationUrl {
    url: string
}

export interface BalanceProp {
    isPromocodeActivated: boolean
}

export const ONE_CLASS_PAYMENT_CHOICE = '0'
export const MONTHLY_SUBSCRIPTION_PAYMENT_CHOICE = '1'

function Balance(prop: BalanceProp) {
    const history = useHistory();

    const rub = i18n.language === "en" ? "rub." : "руб.";
    const highlySkilledMentors = i18n.language === "en" ? "Highly skilled mentors" : "Занятие проводят высококлассные преподаватели";
    const individualStudyPlan = i18n.language === "en" ? "Personal study plan." : "Индивидуальная программа";
    const clearFeedback = i18n.language === "en" ? "Clear feedback and search for growth points" : "Чёткий фидбек и поиск точек роста";
    const withoutBoredom = i18n.language === "en" ? "Without boredom and cramming" : "Без скуки и зубрежки";
    const persanalManager = i18n.language === "en" ? "Personal manager in touch 24/7" : "Персональный менеджер на связи 24/7";
    const additionalReading = i18n.language === "en" ? "Additional readings" : "Дополнительные материалы";
    const additionalMeetingsWithNatives = i18n.language === "en" ? "Additional conversations with other English speakers" : "Дополнительные беседы с другими носителями";
    const buy = i18n.language === "en" ? "Buy" : "Купить";

    const [paymentMethodData, setPaymentMethodData] = useState<PaymentData | null>(null)
    const [expectedSum, setExpectedSum] = useState(0)
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [value, setValue] = useState<string | null>(null);
    const [promoActivated, setPromoActivated] = useState(false)

    //const [balanceData, setBalanceData] = useState<BalanceData | null>(null)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | null>(null)
    /**
     * Сразу же после "оплаты от пользователя" и до фактического подтверждения на беке выводим данный баннер
     */
    const [renderPendingBalanceNotification, setRenderPendingBalanceNotification] = useState(false)
    /**
     * Сумма пополнения баланса
     */
    const [amountOfBalance, setAmountOfBalance] = useState("0")
    /**
     * Фио пользователя, который совершит перевод
     */
    const [fioOfPayer, setFioOfPayer] = useState("")


    useEffect(()=>{
        setPromoActivated(prop.isPromocodeActivated)
    }, [prop.isPromocodeActivated])


    useEffect(() => {
        authAxios.get(`/purchase/addClasses`).then(x => {
            if (x.data.success) {
                console.log("Added class")
            }
            else{
                console.log("Eror")
            }
        })
    }, [])

    const handleOurPaySubmit = () => {
        authAxios.post(`/paymentApi/startPaymentConfirmation`, {
            amount: expectedSum,
            fio: fioOfPayer,
        }).then(x => {
            if (x.data.success) {
                showSuccessNotification("Платеж принят и ожидает подтверждения")
                setIsModalOpened(false)
            } else {
                showFailureNotification("Что-то пошло не так")
            }
        })
    }

    const handleChoiceMade = (choice: string) => {
        console.log("balance new x" + choice)
        if (choice === MONTHLY_SUBSCRIPTION_PAYMENT_CHOICE) {
            setExpectedSum(15000)
        } else {
            setExpectedSum(2000)
        }
        if (paymentMethodData?.method === "Ukassa") {
            let amount = choice === MONTHLY_SUBSCRIPTION_PAYMENT_CHOICE ? 15000 : 2000;
            if (promoActivated || paymentMethodData.isWelcomePromocodeActive) {
                if (amount === 2000) {
                    amount = 1000
                }
                if (amount === 15000) {
                    amount = 12000
                }
            }
            authAxios.post(`/paymentApi/startPaymentConfirmation`, {
                amount: amount,
                fio: fioOfPayer,
            }).then(x => {
                if (x.data.success) {
                    const redirectUrl = (x.data.data as ConfirmationUrl)
                    window.location.replace(redirectUrl.url);
                } else {
                    showFailureNotification("Что-то пошло не так")
                }
            })
        } else {
            setIsModalOpened(true)
        }
    }


    const getOurPaymentOptions = () => {
        if (!paymentMethodData || !paymentMethodData.extraData) {
            return []
        }
        const isEnglish = i18n.language === "en"
        return paymentMethodData.extraData.listOfPaymentMethods.map(x => (isEnglish ? x.titleEn : x.title))
    }

    const getOurPaymentDescription = () => {
        if (!paymentMethodData || !paymentMethodData.extraData) {
            return null
        }
        const isEnglish = i18n.language === "en"
        return paymentMethodData.extraData
            .listOfPaymentMethods
            .filter(x => x.title === value || x.titleEn === value)
            .map(x => (isEnglish ? x.descriptionEn : x.description))[0]
    }

    return (
        <>
            <Modal
                opened={isModalOpened}
                onClose={() => setIsModalOpened(false)}
                title={
                    i18n.language === "en" ? `Transfer of ${expectedSum} rub.` : `Перевод ${expectedSum} руб.`
                }>
                <Stack>
                    <Select value={value} onChange={setValue} data={getOurPaymentOptions()}/>
                    {getOurPaymentDescription() !== null &&
                        <Text>{getOurPaymentDescription()}</Text>
                    }
                    <Button onClick={handleOurPaySubmit}>Подтвердить</Button>
                </Stack>
            </Modal>


            <Center>
                <Group>
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Card.Section>
                            <Image
                                src={'/img/png/1-class=progress-Illustration.png'}
                                height={160}
                                alt="Norway"
                                fit="contain"
                            />
                        </Card.Section>

                        <Group position={"apart"}>
                            <Text weight={500} size={"xl"}>Одно занятие</Text>
                            <Badge color="pink" variant="light" size={"xl"}>
                                {(paymentMethodData?.isWelcomePromocodeActive || promoActivated)
                                    ?
                                    <Group>
                                        <Text>1 000 {rub}</Text>
                                        <Text td="line-through">2 000 {rub}</Text>
                                    </Group>
                                    :
                                    <Text>2 000 {rub}</Text>
                                }
                            </Badge>
                        </Group>

                        <Space h={"md"}/>


                        <Button onClick={() => handleChoiceMade(ONE_CLASS_PAYMENT_CHOICE)}
                                color="blue" fullWidth mt="md">
                            {buy}
                        </Button>
                    </Card>

                </Group>
            </Center>



        </>
    );
}


export default Balance;
