import {useEffect, useState} from "react";
import {Select} from "@mantine/core";
import i18n from "i18next";


export const TRANSFER_BY_PHONE = 0
export const TRANSFER_BY_CARD_NUMBER = 1
export const TRANSFER_BY_ACCOUNT_DETAILS = 2

export interface OnBalanceTransferChoiceChangeCallback {
    onChoiceChanged: (newChoice: number) => void
}

function BalanceReplenishmentMean(prop: OnBalanceTransferChoiceChangeCallback) {

    const pickStudent = i18n.language === "en" ? "Pick payment method" : "Выберите способ оплаты"
    const pickOne = i18n.language === "en" ? "Pick one" : "Выберите одно"
    const TRANSFER_BY_PHONE_LABEL = i18n.language === "en" ? "Transfer by phone number" : "Перевод по номеру телефона"
    const TRANSFER_BY_CARD_NUMBER_LABEL = i18n.language === "en" ? "Transfer by card number" : "Перевод по номеру карты"
    const TRANSFER_BY_ACCOUNT_DETAILS_LABEL = i18n.language === "en" ? "Transfer by account details" : "Перевод по реквизитам"

    const data = [
        TRANSFER_BY_PHONE_LABEL,
        TRANSFER_BY_CARD_NUMBER_LABEL,
        TRANSFER_BY_ACCOUNT_DETAILS_LABEL,
    ]

    const [value, setValue] = useState<string | null>(null);

    useEffect(() => {
        if (value !== null) {
            if (value === TRANSFER_BY_PHONE_LABEL) {
                prop.onChoiceChanged(TRANSFER_BY_PHONE)
            } else if (value === TRANSFER_BY_CARD_NUMBER_LABEL) {
                prop.onChoiceChanged(TRANSFER_BY_CARD_NUMBER)
            } else if (value === TRANSFER_BY_ACCOUNT_DETAILS_LABEL) {
                prop.onChoiceChanged(TRANSFER_BY_ACCOUNT_DETAILS)
            }
        }
    }, [prop, value])

    return (
        <>
            <Select
                label={pickStudent}
                placeholder={pickOne}
                data={data}
                value={value}
                onChange={setValue}
            />
        </>
    );
}

export default BalanceReplenishmentMean;
