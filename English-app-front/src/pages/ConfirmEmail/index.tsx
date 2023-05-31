import {withTranslation} from "react-i18next";
import {useLocation, useParams, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {ContentWrapper2} from "../../components/ConfirmEmail/styles";
import i18n from "i18next";
import useInterval from "../../common/utils/useInterval";
import {PngIcon} from "../../common/PngIcon";
import Container2 from "../../common/Container2";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {setTokenPair} from "../../common/Auth/LocalStorageService";
import {baseURL} from "../../config";

const ConfirmEmailPage = () => {
    const location = useLocation()
    const history = useHistory();


    // Loading, Confirmed, Error
    const [pageState, setPageState] = useState("Loading")
    useEffect(() => {
        axios.get(`${baseURL}authApi${location.pathname}`)
            .then(x => {
                if (x.data.success) {
                    setTokenPair({
                        accessToken: x.data.data.accessToken,
                        refreshToken: x.data.data.refreshToken
                    })

                }
                setPageState(x.data.success ? "Confirmed" : "Error")
            })
            .catch(x => {
                console.log("Confirm Email Error " + JSON.stringify(x))
            })
    }, [])

    useInterval(
        () => {
            history.replace("/lk")
        },
        // Delay in milliseconds or null to stop it
        pageState === "Confirmed" ? 3000 : null
    )


    const emailConfirmed = i18n.language === "en" ? "Email confirmed" : "Почта подтверждена"
    const emailNotConfirmed = i18n.language === "en" ? "Email not confirmed" : "Ошибка"

    return (
        <>
            <Header/>
            <Container2>
                {
                    pageState === "Loading" &&
                    <ContentWrapper2>
                        <div className="cssload-dots">
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                            <div className="cssload-dot"></div>
                        </div>
                    </ContentWrapper2>
                }
                {
                    pageState === "Confirmed" &&
                    <ContentWrapper2>
                        <h3>{emailConfirmed}</h3>
                        <PngIcon
                            width="100rem"
                            height="100rem"
                            src="success.png"/>
                    </ContentWrapper2>
                }
                {
                    pageState === "Error" &&
                    <ContentWrapper2>
                        <h3>{emailNotConfirmed}</h3>
                        <PngIcon
                            width="100rem"
                            height="100rem"
                            src="fail.png"/>
                    </ContentWrapper2>
                }
                {/*<div className="spinner-container">*/}
                {/*    <div className="loading-spinner">*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<ConfirmEmail/>*/}
            </Container2>
            <Footer/>
        </>
    );
};

export default withTranslation()(ConfirmEmailPage);
