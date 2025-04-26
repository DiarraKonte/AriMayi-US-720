import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";
import saveCVMiddleware from "./app/[locale]/(auth)/portal/trainee/CvMiddleware";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
});

export function middleware(request: NextRequest) {
  // Appliquez d'abord le middleware Redux (saveCVMiddleware)
  saveCVMiddleware(request);

  // Puis appliquez le middleware i18n
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.png|robots.txt).*)"],
};
