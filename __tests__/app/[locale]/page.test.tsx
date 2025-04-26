import { render, screen } from "@testing-library/react";
import Home from "@/app/[locale]/page";
import "@testing-library/jest-dom";


jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock("../locales/client", () => ({
  useChangeLocale: jest.fn(() => jest.fn()),
  useCurrentLocale: jest.fn(() => "en"),
  useI18n: jest.fn(),
  useScopedI18n: jest.fn(),
}));

jest.mock("../src/app/[locale]/components/languageSwitcher", () => () => <div>LanguageSwitcher</div>);
jest.mock("../src/app/components/adminHome", () => () => <div>AdminHome</div>);

describe("Home Component", () => {
  it("renders correctly", () => {
    render(<Home />);

    // Check links
    const portalLink = screen.getByText("Portal");
    const accountLink = screen.getByText("Account");
    expect(portalLink).toBeInTheDocument();
    expect(portalLink).toHaveAttribute("href", "/portal");
    expect(accountLink).toBeInTheDocument();
    expect(accountLink).toHaveAttribute("href", "/login");

    expect(screen.getByText("LanguageSwitcher")).toBeInTheDocument();
    expect(screen.getByText("AdminHome")).toBeInTheDocument();
  });
});