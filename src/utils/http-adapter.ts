import { backendUrl } from '~/constants/backend';

function createHeader(accessToken: string) {
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + accessToken,
  };
}

export default class Http {
  static patch = async (url: string, payload: any, {
    onFail = (message: string) => {},
    onSuccess = (data: any) => {},
    loadingToggler = (isLoading: boolean) => {},
    accessToken = ''
  } = {}) => {
    try {
      loadingToggler(true);

      const res = await fetch(backendUrl + url, {
        method: "PATCH",
        headers: createHeader(accessToken),
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

      return json;

    } catch (error: any) {
      if (!error?.message) onFail('An unknown error occured');
      else onFail(error.message);
    }
    finally {
      loadingToggler(false);
    }
  };
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
        headers: createHeader(accessToken),
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

      return json;

    } catch (error: any) {
      if (!error?.message) onFail('An unknown error occured');
      else onFail(error.message);
    }
    finally {
      loadingToggler(false);
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
        headers: createHeader(accessToken),
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

      return json;

    } catch (error: any) {
      if (!error?.message) onFail('An unknown error occured');
      else onFail(error.message);
    }
    finally {
      loadingToggler(false);
    }
  };
}