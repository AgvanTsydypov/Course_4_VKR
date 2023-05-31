import { validateProps } from "../../common/types";
import i18n from "i18next";

export default function validate(values: validateProps) {
  let errors = {} as validateProps;

  if (!values.name) {
    errors.name = i18n.language === "en" ? "Name is required" : "Имя обязательно";
  }
  // if (!values.email) {
  //   errors.email = i18n.language === "en" ? "Email address is required" : "Почта обязательна";
  // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = i18n.language === "en" ? "Email address is invalid" : "Почте некорректна";
  // }
  if (!values.phone) {
    errors.phone = i18n.language === "en" ? "Phone is required" : "Телефон обязателен";
  }
  return errors;
}
