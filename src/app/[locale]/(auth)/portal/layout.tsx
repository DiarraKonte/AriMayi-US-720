import { ReactNode } from "react";
import NotificationProvider from "@/app/[locale]/Provider/NotificationProvider";
import NavBar from "@/app/components/navBar";

type Props = {
  children: ReactNode;
  params: { locale: string };
};
export default function PortalLayout({ children, params }: Props) {
  return (
    <main>
      <NavBar />
      <NotificationProvider>{children}</NotificationProvider>
    </main>
  );
}
