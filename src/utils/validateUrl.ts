import { isURL } from "validator";

export const isValidUrl = (url: string) => {
  try {
    const isValid = isURL(url);
    if (!isValid) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};
