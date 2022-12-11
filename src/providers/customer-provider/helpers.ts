import backendUrl from '~/contants/backend-url';
import { AccessToken, ErrorFromBackend, SignInDto, SignUpDto } from './types';

export async function signIn(dto: SignInDto) {
  const url = backendUrl + '/auth/signin';
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(dto),
    headers: { 'Content-type': 'application/json' }
  });
  const data = await res.json();

  if (res.ok) return {
    ok: true,
    data: (data as AccessToken)
  };
  else return {
    ok: false,
    error: (data as ErrorFromBackend)
  };
}

export async function signUp(dto: SignUpDto) {
  const url = backendUrl + '/auth/signup';
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(dto),
    headers: { 'Content-type': 'application/json' }
  });
  const data = await res.json();

  if (res.ok) return {
    ok: true,
    data: (data as AccessToken)
  };
  else return {
    ok: false,
    error: (data as ErrorFromBackend)
  };
}