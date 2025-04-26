import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export const useContact = () =>
  useSelector((state: RootState) => state.contact);
