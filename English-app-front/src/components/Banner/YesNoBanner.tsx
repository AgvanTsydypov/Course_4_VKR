import {useEffect, useState} from 'react';
import {Alert, Stack, Button, Grid, Flex} from "@mantine/core";
import {IconAlertCircle} from "@tabler/icons";
import i18n from "i18next";
import authAxios from "../../common/Api/AuthAxios";
import {showSuccessNotification} from "../Notification/NotificationManager";
import authAxiosWithoutBaseUrl from "../../common/Api/AuthAxiosWithoutBaseUrl";

export interface YesNoBannerProp {
    id: string,
    question: string,
    url: string,
    questionEn: string,
    userId: string
}

function YesNoBanner(prop: YesNoBannerProp) {

    const [hideBanner, setHideBanner] = useState(false)
    const ALERT_TITLE = i18n.language === "en" ? "Poll" : "Вопрос";
    const ALERT_DESCRIPTION = i18n.language === "en" ? prop.questionEn : prop.question;

    const onYesClicked = () => {

        authAxiosWithoutBaseUrl.post(`http://${prop.url}`, {
            isYes: true
        }).then(x => {
            showSuccessNotification("Ответ принят")
            setHideBanner(true)
        })
    }

    const onNoClicked = () => {
        authAxiosWithoutBaseUrl.post(`http://${prop.url}`, {
            isYes: true
        }).then(x => {
                showSuccessNotification("Ответ принят")
                setHideBanner(true)
            }
        )
    }

    return (
        <>
            {!hideBanner &&
            <>
                <Alert icon={<IconAlertCircle size={16}/>} title={ALERT_TITLE} color="red">
                    {ALERT_DESCRIPTION}
                </Alert>
                <Flex
                    mih={50}
                    gap="md"
                    bg="#FFF5F5"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                >
                    <Button variant="subtle" color="dark" onClick={onYesClicked}>Да</Button>
                    <Button variant="subtle" color="dark" onClick={onNoClicked}>Нет</Button>
                </Flex>
            </>
            }
        </>

    );
}

export default YesNoBanner;
