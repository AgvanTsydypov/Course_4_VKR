import i18n from "i18next";
import {useEffect, useState} from "react";
import {Button, Stack, Text, TextInput, Title} from "@mantine/core";
import {StudentGradeProp} from "../TeacherComponents/GradePicker/GradePicker";
import authAxios from "../../common/Api/AuthAxios";
import {showFailureNotification, showSuccessNotification} from "../Notification/NotificationManager";

export interface TelegramConfirmationProp {
    telegramDeepLink: string,
    onSuccessConfirmation?: (newUsername: string) => void
    onFailureConfirmation?: () => void
}

function TelegramConfirmation(prop: TelegramConfirmationProp) {
    const [isLoading, setIsLoading] = useState(false)

    const handleTgDeeplink = () => {
        // сначала пытаемся открыть в новой вкладке, затем открываем в текущей
        window.open(prop.telegramDeepLink, "_blank") || window.location.replace(prop.telegramDeepLink);
    }

    const handleTelegramSubmit = () => {
        setIsLoading(true)
        authAxios.post("/profileApi/confirmTelegram").then(x => {
            if (x.data.success) {
                showSuccessNotification(`Телеграмм успешно подтвержден!`)
                if (prop.onSuccessConfirmation)
                    prop.onSuccessConfirmation(x.data.data as string)
            } else {
                console.log("Fail to confirm telegram")
                showFailureNotification("К сожалению, нам не удалось подтвердить телеграмм!")
                if (prop.onFailureConfirmation)
                    prop.onFailureConfirmation()
            }
        }).catch(
            x => {
                console.log("Fail to confirm telegram" + JSON.stringify(x))
                showFailureNotification("К сожалению, нам не удалось подтвердить телеграмм!")
                if (prop.onFailureConfirmation)
                    prop.onFailureConfirmation()
            }
        )
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            <Stack>
                <Text>Нажмити кнопку ниже для перехода в бота, а затем нажмите start внутри бота.</Text>
                <Button
                    variant={"light"}
                    onClick={handleTgDeeplink}
                    loading={isLoading}
                >Перейти в телеграмм</Button>
                <Button
                    onClick={handleTelegramSubmit}
                    loading={isLoading}
                >Подтвердить</Button>
            </Stack>
        </>
    );
}

export default TelegramConfirmation;
