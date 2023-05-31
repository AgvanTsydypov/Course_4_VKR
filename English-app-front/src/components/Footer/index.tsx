import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { SvgIcon } from "../../common/SvgIcon";
import Container from "../../common/Container";

import i18n from "i18next";
import {
  FooterSection,
  Title,
  NavLink,
  Extra,
  LogoContainer,
  Para,
  Large,
  Chat,
  Empty,
  FooterContainer,
  Language,
  Label,
  LanguageSwitch,
  LanguageSwitchContainer,
} from "./styles";
import {Button, CopyButton, Group, Stack, Text} from "@mantine/core";
import {INFO_LINE} from "../../config";
import {IconBrandTelegram, IconBrandWhatsapp} from "@tabler/icons";

interface SocialLinkProps {
  href: string;
  src: string;
}

const Footer = ({ t }: any) => {
  const handleChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const managerContact = i18n.language === "en" ? "@alexandr_speakfastru" : "@alexandr_speakfastru";
  const whatsapp = "+7 (993) 345-53-50"
  const copiedText = i18n.language === "en" ? "copied" : "номер скопирован";

  const handleContactManager = () => {
    window.location.href = "https://t.me/alexandr_speakfastru"
  }
  const SocialLink = ({ href, src }: SocialLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <>
      <FooterSection>
        <Container>
          <Stack>
          <Label htmlFor="select-lang">{t("Language")}</Label>
            <Group>
              <LanguageSwitchContainer>
                <LanguageSwitch onClick={() => handleChange("en")}>
                  <SvgIcon
                      src="united-states.svg"
                      aria-label="homepage"
                      width="30px"
                      height="30px"
                  />
                </LanguageSwitch>
                <LanguageSwitch onClick={() => handleChange("es")}>
                  <SvgIcon
                      src="Flag_of_Russia.svg"
                      aria-label="homepage"
                      width="30px"
                      height="30px"
                  />
                </LanguageSwitch>
              </LanguageSwitchContainer>

            </Group>
          <Text>{INFO_LINE}</Text>
          </Stack>
          </Container>
      </FooterSection>
    </>
  );
};

export default withTranslation()(Footer);
