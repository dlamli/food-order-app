import { FetchConfig } from "../types";

export const sendHttpRequest = async (url: string, config?: FetchConfig) => {
  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Request failed!');

  return data;
}