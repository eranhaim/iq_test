import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

/** Router link that keeps the current language prefix (/he/quiz, /quiz, ...) */
export default function LocaleLink({ to, ...props }) {
  const { prefix } = useI18n();
  const path = to === "/" ? prefix || "/" : `${prefix}${to}`;
  return <Link to={path} {...props} />;
}
