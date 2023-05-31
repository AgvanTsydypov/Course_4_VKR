import {withTranslation} from "react-i18next";
import Container from "../../common/Container";
import LoginForm from "../../common/LoginForm";
import {Col, Row} from "antd";
import {Login as LoginComponent} from "../../components/Authentication/Login"
import Container2 from "../../common/Container2";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container3 from "../../common/Container3";
import { Space } from "@mantine/core";

const Login = () => {
    return (
        <>
            <Header/>
            <Container3>
                {/*<Row justify="center" align="middle">*/}
                {/*    <Col lg={10} md={10} sm={10} xs={10}>*/}
                {/*        <LoginComponent/>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                <LoginComponent/>
            </Container3>
            <Footer/>
        </>
    );
};

export default withTranslation()(Login);
