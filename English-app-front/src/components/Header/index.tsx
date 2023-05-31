import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import { withTranslation } from "react-i18next";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import i18n from "i18next";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "./styles";
import {useLocation, useParams, useHistory} from "react-router-dom";

const Header = ({ t }: any) => {
  const [visible, setVisibility] = useState(false);
  const [scrollToState, setScrollToState] = useState("")
  const location = useLocation()
  const history = useHistory();

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      if(location.pathname !== "/" && location.pathname !== "/home") {
        history.push("/");
      }
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
    };
    return (
        <>

          <CustomNavLinkSmall
              style={{ width: "180px" }}
              onClick={() => history.push("/login")}
          >
            <Span>
              <Button>{t("Contact")}</Button>
            </Span>
          </CustomNavLinkSmall>
        </>
    );
  };

  return (
      <HeaderSection>
        <Container>
          <Row justify="space-between">
            <LogoContainer to="/" aria-label="homepage">
              <SvgIcon src="logo.svg" width="101px" height="64px" />
            </LogoContainer>
            {
              // проверяем, что мы на главной и отрисовываем весь хедер
              // иначе отрисовываем только логотип
                (location.pathname === "/" || location.pathname === "/home")
                &&
                <div>
                  <NotHidden>
                    <MenuItem />
                  </NotHidden>
                  <Burger onClick={showDrawer}>
                    <Outline />
                  </Burger>
                </div>
            }

          </Row>
          <Drawer closable={false} visible={visible} onClose={onClose}>
            <Col style={{ marginBottom: "2.5rem" }}>
              <Label onClick={onClose}>
                <Col span={12}>
                  <Menu>Menu</Menu>
                </Col>
                <Col span={12}>
                  <Outline />
                </Col>
              </Label>
            </Col>
            <MenuItem />
          </Drawer>
        </Container>
      </HeaderSection>
  );
};

export default withTranslation()(Header);