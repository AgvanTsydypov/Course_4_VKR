import i18n from "i18next";
import {useEffect, useState} from "react";
import {Alert, Select} from "@mantine/core";
import {StudentGradeProp} from "../../TeacherComponents/GradePicker/GradePicker";
import {AlertVariant} from "@mantine/core/lib/Alert/Alert.styles";


export interface InfoBannerData {
    /**
     dark,
     gray,
     red,
     pink,
     grape,
     violet,
     indigo,
     cyan,
     teal,
     green,
     lime,
     yellow,
     orange,
     null
     */
    color?: string,

    /**
     * null, filled, outline
     */
    variant?: string,
    titleRu: string,
    titleEn: string,
    descriptionRu: string
    descriptionEn: string
}

function InfoBanner(prop: InfoBannerData) {

    return (
        <>
            <Alert
                variant={(prop.variant ?? 'light') as AlertVariant}
                color={prop.color ?? 'blue'}
                title={ i18n.language === "en" ? prop.titleEn : prop.titleRu}
            >
                { i18n.language === "en" ? prop.descriptionEn : prop.descriptionRu}
            </Alert>
        </>
    );
}

export default InfoBanner;
