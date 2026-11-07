import { Outlet, Route, Routes, useParams } from "react-router-dom";
import {
  I18nProvider,
  SUPPORTED_LANGS,
  DEFAULT_LANG,
} from "./i18n/I18nProvider";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";

/** Picks the language from the URL (/he/..., /es/...; none = English) */
function LocaleShell() {
  const { lang = DEFAULT_LANG } = useParams();
  if (!SUPPORTED_LANGS.includes(lang)) return <NotFound />;
  return (
    <I18nProvider lang={lang}>
      <Outlet />
    </I18nProvider>
  );
}

const pages = (
  <>
    <Route index element={<Home />} />
    <Route path="quiz" element={<Quiz />} />
  </>
);

export default function App() {
  return (
    <Routes>
      <Route element={<LocaleShell />}>{pages}</Route>
      <Route path=":lang" element={<LocaleShell />}>
        {pages}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
