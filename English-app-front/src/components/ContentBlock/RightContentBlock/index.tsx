import {Row, Col} from "antd";
import {withTranslation} from "react-i18next";
import {SvgIcon} from "../../../common/SvgIcon";
import {ContentBlockProps} from "../types";
import {Fade} from "react-awesome-reveal";
import {
    RightBlockContainer,
    Content,
    ContentWrapper,
    ButtonWrapper,
} from "./styles";
import {useHistory} from "react-router-dom";
import {Button, Group, Modal, SimpleGrid, Stack, Title} from "@mantine/core";
import {useState} from "react";
import {isMobile} from 'react-device-detect';
import {QuickRegistration} from "../../QuickRegisteration/QuickRegistration";
import i18n from "i18next";

const RightBlock = ({
                        title,
                        content,
                        button,
                        icon,
                        t,
                        id,
                    }: ContentBlockProps) => {
    const history = useHistory();
    const [opened, setOpened] = useState(false);
    const scrollTo = (id: string) => {
        const element = document.getElementById(id) as HTMLDivElement;
        element.scrollIntoView({
            behavior: "smooth",
        });
    };

    const learnMore = i18n.language === "en" ? "About us" : "О нас"
    const promo = i18n.language === "en" ? "Promo" : "Розыгрыш"
    const quickRegistration = i18n.language === "en" ? "Quick registration" : "Подобрать носителя"

    return (

        <RightBlockContainer>
            <Modal
                size="50%"
                opened={opened}
                onClose={() => setOpened(false)}
            >
                <QuickRegistration/>
            </Modal>
            <Fade direction="right">
                <Row justify="space-between" align="middle" id={id}>
                    <Col lg={11} md={11} sm={11} xs={24}>
                        <ContentWrapper>
                            <h6>{t(title)}</h6>
                            <Content>{t(content)}</Content>
                            <Stack>

                            </Stack>
                        </ContentWrapper>
                    </Col>
                    <Col lg={11} md={11} sm={12} xs={24}>
                        <SvgIcon src={icon} width="100%" height="100%"/>
                    </Col>
                </Row>
            </Fade>
        </RightBlockContainer>
    );
};

export default withTranslation()(RightBlock);
