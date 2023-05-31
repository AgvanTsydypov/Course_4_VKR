import i18n from "i18next";
import {useEffect, useState} from "react";
import {Button, Stack, Text, TextInput, Title} from "@mantine/core";
import {StudentGradeProp} from "../TeacherComponents/GradePicker/GradePicker";
import authAxios from "../../common/Api/AuthAxios";
import {showFailureNotification, showSuccessNotification} from "../Notification/NotificationManager";

export interface PhoneConfirmationProp {
    onSuccessConfirmation?: (newPhone: string) => void
    onFailureConfirmation?: () => void
    onInternalError?: () => void
}

function PhoneConfirmation(prop: PhoneConfirmationProp) {
    const [isLoading, setIsLoading] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");

    const handlePhoneCallRequest = () => {
        setIsLoading(true)
        authAxios.post("/profileApi/startPhoneConfirmation", {
            phone: phoneNumber
        }).then(x => {
            if (x.data.success) {
                console.log("request call : " + JSON.stringify(x))
                showSuccessNotification(`В течении минуты Вам поступит звонок.`)
            } else {
                console.log("Fail to request phone call")
                showFailureNotification("К сожалению, что-то пошло не так")
                if (prop.onInternalError)
                    prop.onInternalError()
            }
        }).catch(
            x => {
                console.log("Fail to request phone call " + JSON.stringify(x))
                showFailureNotification("К сожалению, что-то пошло не так")
                if (prop.onInternalError)
                    prop.onInternalError()
            }
        )
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handlePhoneConfirmRequest = () => {
        setIsLoading(true)
        authAxios.post("/profileApi/completePhoneConfirmation", {
            code: code
        }).then(x => {
            console.log("request call " + x.data.success)
            if (x.data.success) {
                console.log("request call : " + JSON.stringify(x))
                showSuccessNotification(`Номер успешно подтвержден`)
                if (prop.onSuccessConfirmation)
                    prop.onSuccessConfirmation(phoneNumber)
            } else {
                console.log("Fail to request phone call")
                showFailureNotification("К сожалению, что-то пошло не так")
                if (prop.onFailureConfirmation)
                    prop.onFailureConfirmation()
            }
        }).catch(
            x => {
                console.log("Fail to request phone call " + JSON.stringify(x))
                showFailureNotification("К сожалению, что-то пошло не так")
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
                <Title order={5}>Шаг 1</Title>
                <TextInput
                    placeholder="+79770004412"
                    label="Введите ваш номер"
                    onChange={e => setPhoneNumber(e.target.value)}
                    withAsterisk
                />
                <Button
                    onClick={handlePhoneCallRequest}
                    loading={isLoading}
                >Запросить звонок</Button>
                <Title order={5}>Шаг 2</Title>
                <Text>Вам поступит звонок, введите последние 4 цифры номера, причем трубку брать необязательно.</Text>
                <TextInput
                    placeholder="1234"
                    label="Последние 4 цифры"
                    onChange={e => setCode(e.target.value)}
                    withAsterisk
                />
                <Title order={5}>Шаг 3</Title>
                <Button
                    onClick={handlePhoneConfirmRequest}
                    loading={isLoading}
                >Подтвердить</Button>
            </Stack>
        </>
    );
}

export default PhoneConfirmation;
