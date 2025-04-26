
jest.mock("../../locales/client", () => ({
    useI18n: () => (key: string) => key, // Retourne simplement la clé de traduction
  }));
  