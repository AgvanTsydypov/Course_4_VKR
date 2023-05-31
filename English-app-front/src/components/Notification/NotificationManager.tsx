import i18n from "i18next";
import {showNotification} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons";

const success = i18n.language === "en" ? "Success" : "Успешно"
const failure = i18n.language === "en" ? "Failure" : "Что-то пошло не так"
const info = i18n.language === "en" ? "Info" : "Информация"

export const showSuccessNotification: (text: string) => void = (text: string) => {
    showNotification({
        title: success,
        message: text,
        color: 'teal',
        icon: <IconCheck/>,
        autoClose: 5000,
    })
}

export const showFailureNotification: (text: string) => void = (text: string) => {
    showNotification({
        title: failure,
        message: text,
        color: 'red',
        icon: <IconX/>,
        autoClose: 5000,
    })
}


export const showInfoNotification: (text: string) => void = (text: string) => {
    showNotification({
        title: info,
        message: text,
        autoClose: 5000,
    })
}


