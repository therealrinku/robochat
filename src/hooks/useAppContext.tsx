import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function useAppContext() {
  const appContext = useContext(AppContext);
  return appContext;
}
