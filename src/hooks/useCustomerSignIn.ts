import { showNotification } from '@mantine/notifications';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useCustomer } from '~/providers/customer-provider';
import { UserRole } from '~/providers/customer-provider/types';
import Http from '~/utils/http-adapter';

export default function useCustomerSignIn() {
  const { dispatch } = useCustomer();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.user) return;

    const email = session.user.email!;
    const name = session.user.name!;
    const image = session.user.image!;

    console.log({
      name, email
    });


    Http.post(
      '/auth/signin',
      { email, password: name },
      {
        onSuccess: (data) => {
          dispatch({
            action: 'set-customer',
            payload: {
              access_token: data.access_token,
              email,
              name,
              image,
            }
          });
        },
        onFail: errorMessage => {
          console.log({ errorMessage });
          Http.post(
            '/auth/signup',
            {
              name,
              email,
              password: name,
              role: UserRole.customer
            },
            {
              onSuccess: data => {
                dispatch({
                  action: 'set-customer',
                  payload: {
                    access_token: data.access_token,
                    email,
                    name,
                    image,
                  }
                });
              },
              onFail: message => {
                showNotification({
                  message,
                  color: 'red'
                });
              }
            }
          );
        }
      }
    );
  }, [dispatch, session]);
}
