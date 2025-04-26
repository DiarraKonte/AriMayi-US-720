import { saveToLocalStorage } from "./localStorage";

const saveCVMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);

  // Save the CV in location after each modification
  if (
    action.type.startsWith("resume/add") ||
    action.type.startsWith("resume/update") ||
    action.type.startsWith("resume/delete")
  ) {
    const state = store.getState();
    console.log("État actuel du CV :", state.resume); // Log for debugging
    saveToLocalStorage("resumeData", state.resume);
  }

  return result;
};

export default saveCVMiddleware;
