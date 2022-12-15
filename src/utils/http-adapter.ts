import { backendUrl } from '~/constants/backend';

export default class Http {
  static post = async (url: string, payload: any, {
    onFail = (message: string) => {},
    onSuccess = (data: any) => {},
    loadingToggler = (isLoading: boolean) => {},
    accessToken = ''
  } = {}) => {
    try {
      loadingToggler(true);

      const res = await fetch(backendUrl + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok) onSuccess(json);
      else {
        let errorMessage = json.message;
        if (Array.isArray(json.message)) {
          errorMessage = json.message[0];
        }
        onFail(errorMessage);
      }

      loadingToggler(false);

      return json;

    } catch (error: any) {
      if (!error?.message) onFail('An unknown error occured');
      else onFail(error.message);
    }
  };
  static get = async (url: string, {
    onFail = (message: string) => {},
    onSuccess = (data: any) => {},
    loadingToggler = (isLoading: boolean) => {},
    accessToken = ''
  } = {}) => {
    try {
      loadingToggler(true);

      const res = await fetch(backendUrl + url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
      });

      const json = await res.json();

      if (res.ok) onSuccess(json);
      else {
        let errorMessage = json.message;
        if (Array.isArray(json.message)) {
          errorMessage = json.message[0];
        }
        onFail(errorMessage);
      }

      loadingToggler(false);

      return json;

    } catch (error: any) {
      if (!error?.message) onFail('An unknown error occured');
      else onFail(error.message);
    }
  };
}