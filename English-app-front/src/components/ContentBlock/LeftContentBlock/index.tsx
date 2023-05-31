import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { SvgIcon } from "../../../common/SvgIcon";
import { ContentBlockProps } from "../types";
import { Fade } from "react-awesome-reveal";
import {
  LeftContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara,
} from "./styles";
import { Button } from "@mantine/core";
import React from "react";
import {useHistory} from "react-router-dom";

const LeftContentBlock = ({
                            icon,
                            title,
                            content,
                            section,
                            t,
                            id,
                          }: ContentBlockProps) => {
  const history = useHistory()
  return (
      <LeftContentSection>

      </LeftContentSection>
  );
};

export default withTranslation()(LeftContentBlock);
