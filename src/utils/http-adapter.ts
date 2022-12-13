import { backendUrl } from '~/constants/backend';

export default class Http {
  static post = async (url: string, payload: any, {
    onFail = (message: string) => {},
    onSuccess = (data: any) => {},
    loadingToggler = (isLoading: boolean) => {},
    accessToken = ''
  } = {}) => {
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
    else onFail(json.message);
    loadingToggler(false);
    return json;
  };
  static get = async (url: string, {
    onFail = (message: string) => {},
    onSuccess = (data: any) => {},
    loadingToggler = (isLoading: boolean) => {},
    accessToken = ''
  } = {}) => {
    loadingToggler(true);
    const res = await fetch(backendUrl + url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken,
      },
    });
    const json = await res.json();
    if (res.ok) onSuccess(json);
    else onFail(json.message);
    loadingToggler(false);
    return json;
  };
}