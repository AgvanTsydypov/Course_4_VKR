import {
    createStyles,
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Image,
    Stack,
    Button,
    Space,
    Group,
    TextInput, Divider, Grid
} from '@mantine/core';
import React, {useState} from "react";
import {Size, useWindowSize} from "../../hooks/useWindowSize";
import i18n from "i18next";
import authAxios from "../../common/Api/AuthAxios";
import {setTokenPair} from "../../common/Auth/LocalStorageService";

export interface PromocodeProp {
    onPromocodeActivated: (activated: boolean) => void
}

export function PromocodeCards(prop: PromocodeProp) {

    const [isPromotionVisible, setIsPromotionVisible] = useState(true)
    const [promocodeInput1, setPromocodeImput1] = useState("")
    const [promocodeInputError, setPromocodeImputError] = useState("")

    const promocode = i18n.language === "en" ? "Promotion code" : "Поромкод"
    const promocodeError = i18n.language === "en" ? "Incorrect promotion code" : "Неверный промкод"
    const activate = i18n.language === "en" ? "Activate" : "Активировать"

    const onActivateClicked = () => {
        authAxios.post("/paymentApi/activatePromocode", {
            promocode: promocodeInput1
        }).then(x => {
                if (x.data.success) {
                    setIsPromotionVisible(false)
                    prop.onPromocodeActivated(true)
                } else {
                    setPromocodeImputError(promocodeError)
                }
            }
        )
    }

    return (
        <>
            {isPromotionVisible &&
                <Group>
                    <TextInput
                        radius="xl"
                        size="xl"
                        placeholder={promocode}
                        error={promocodeInputError !== "" ? promocodeInputError : null}
                        value={promocodeInput1}
                        onChange={e => setPromocodeImput1(e.target.value)}
                    />
                    <Button
                        color="violet"
                        radius="xl"
                        size="xl"
                        onClick={onActivateClicked}
                    >{activate}
                    </Button>
                </Group>
            }
        </>
    );
}
