import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default {
  async sendApiRequest(url: string, method: string, setauth: boolean, body: any) {
    const requestOptions: any = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
      cache: "no-store",
    };
    if (method === "DELETE") {
      // delete requestOptions.body;
    }
    if (method === "GET") {
      delete requestOptions.body;
    }

    try {
      const response = await fetch(url, requestOptions);
      let body = await response.text();
      if (response.status != 200) {
        throw body;
      }
      const data = body.includes("{") ? JSON.parse(body) : body;
      return data;
    } catch (e) {
      throw e;
    }
  },
};
