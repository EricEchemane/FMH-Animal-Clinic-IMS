import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useCustomer } from '~/providers/customer-provider';
import { signIn, signUp } from '~/providers/customer-provider/helpers';
import { UserRole } from '~/providers/customer-provider/types';

export default function useCustomerSignIn() {
  const { dispatch } = useCustomer();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.user) return;

    const email = session.user.email!;
    const name = session.user.name!;
    const image = session.user.image!;

    signIn({ email, password: name }).then(data => {
      if (data.ok) {
        dispatch({
          action: 'set-customer',
          payload: {
            access_token: data.data?.access_token,
            email,
            name,
            image,
          }
        });
      }
      else {
        signUp({
          email, password: name, role: UserRole.customer
        }).then(data => {
          if (!data.ok) return;
          dispatch({
            action: 'set-customer',
            payload: {
              access_token: data.data?.access_token,
              email,
              name,
              image,
            }
          });
        });
      }
    });
  }, [dispatch, session]);
}
