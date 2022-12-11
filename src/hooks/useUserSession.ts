import { useSession } from 'next-auth/react';
import Router from 'next/router';

type Props = {
  whenFoundRedirectTo?: string;
  whenNotFoundRedirectTo?: string;
};

export default function useUserSession({
  whenFoundRedirectTo,
  whenNotFoundRedirectTo
}: Props) {

  const { data: session, status } = useSession();

  switch (status) {
    case 'authenticated':
      if (whenFoundRedirectTo) {
        Router.push(whenFoundRedirectTo);
      }
      return { session, status };
    case 'unauthenticated':
      if (whenNotFoundRedirectTo) {
        Router.push(whenNotFoundRedirectTo);
      }
      return { session, status };
    default:
      return { session, status };
  }
}