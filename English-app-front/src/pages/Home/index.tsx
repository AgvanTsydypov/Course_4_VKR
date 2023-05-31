import {lazy, useEffect, useState} from "react";
import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";
import {withTranslation} from "react-i18next";
import Review from "../../components/Review/Review";
import i18n from "i18next";
import {useDidUpdate, useLocalStorage} from "@mantine/hooks";
import {tokenPair} from "../../common/types"
import {useHistory} from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {getTokenPair, TokenPairType} from "../../common/Auth/LocalStorageService";
import authAxios from "../../common/Api/AuthAxios";
import {Button, Modal} from "@mantine/core";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const Container2 = lazy(() => import("../../common/Container2"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

const Home = () => {
    const history = useHistory();
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        const tokenPair: TokenPairType | null = getTokenPair()
        if (tokenPair !== null) {
            authAxios("/authApi/validateJwt")
                .then(x=> {
                    if(x.data.success) {
                        history.replace("/lk")
                    }
                })
            // Есть access_token
        }
    }, [history])

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Introduce yourself!"
            >
                {/* Modal content */}
            </Modal>
            <Header/>
            <Container>
                <ScrollToTop/>
                <ContentBlock
                    type="right"
                    title="IntroContentTitle" // Прокидываем имя переводимого блока
                    content="IntroContentText"
                    button={IntroContent.button}
                    icon="developer.svg"
                    id="intro"
                />
                <MiddleBlock
                    title="MiddleBlockContentTitle"
                    content="MiddleBlockContentText"
                    button={MiddleBlockContent.button}
                />
                <ContentBlock
                    type="left"
                    title="AboutContentTitle"
                    content="AboutContentText"
                    // section={AboutContent.section}
                    icon="graphs.svg"
                    id="about"
                />
                {/* <ContentBlock
                    type="right"
                    title="ProductLunchTitle"
                    content="ProductLunchText"
                    icon="product-launch.svg"
                    id="mission"
                /> */}
                <ContentBlock
                    type="left"
                    title="AboutUsTitle"
                    content="AboutUsText"
                    icon="waving.svg"
                    id="product"
                />
                {/*<Contact*/}
                {/*    title="ContactContentTitle"*/}
                {/*    content="ContactContentText"*/}
                {/*    id="contact"*/}
                {/*/>*/}
                {i18n.language === "es" && <Review idForSearch="review"/>}
                {/*Если язык русский, то показываем блок с отзывами. Иначе скрываем его.*/}
            </Container>
            <Footer/>
        </>
    );
};

export default withTranslation()(Home);