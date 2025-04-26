declare module "next-intl" {
  export function useTranslations(namespace?: string): (key: string) => string;
  export function useCurrentLocale(): string;
}

declare module "next-intl/client" {
  export function useTranslations(namespace?: string): (key: string) => string;
  export function useCurrentLocale(): string;
}
