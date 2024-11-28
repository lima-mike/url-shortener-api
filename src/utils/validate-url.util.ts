import { isURL } from "validator";

export const isValidUrl = (url: string) => {
  try {
    return isURL(url, {
      protocols: ["http", "https"],
      require_protocol: true,
    });
  } catch {
    return false;
  }
};
