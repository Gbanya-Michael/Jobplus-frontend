import axios from "axios";
import { parseErrors } from "../utilities/parseErrors";

export const useApi = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const request = async (endpoint, options = {}) => {
    try {
      const res = await axios({
        method: options.method || "GET",
        url: `${BACKEND_URL}${endpoint}`,

        data: options.data || {},
        params: options.params || {},
      });
      if (options.onSuccess) {
        options.onSuccess(res);
      }
    } catch (error) {
      options.onFailure && options.onFailure(parseErrors(error));
    }
  };

  return {
    post: (endpoint, options) =>
      request(endpoint, { ...options, method: "POST" }),
  };
};
