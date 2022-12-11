import { backendUrl } from '~/constants/backend';
import { AccessToken, ErrorFromBackend, SignInDto, SignUpDto } from './types';

export function createFetch<T>(url: string, dto: T, token = '') {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(dto),
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
}

export async function signIn(dto: SignInDto) {
  const url = backendUrl + '/auth/signin';
  const res = await createFetch(url, dto);
  const data = await res.json();

  if (res.ok) {
    return {
      ok: true,
      data: (data as AccessToken),
    };
  }
  return {
    ok: false,
    error: (data as ErrorFromBackend)
  };
}

export async function signUp(dto: SignUpDto) {
  const url = backendUrl + '/auth/signup';
  const res = await createFetch(url, dto);
  const data = await res.json();

  if (res.ok) {
    return {
      ok: true,
      data: (data as AccessToken),
    };
  }
  return {
    ok: false,
    error: (data as ErrorFromBackend)
  };
}