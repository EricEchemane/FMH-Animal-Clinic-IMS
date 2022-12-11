import React, { useEffect } from 'react';
import useUserSession from '~/hooks/useUserSession';
import { useCustomer } from '~/providers/customer-provider';

export default function BookSchedule() {
  const { customer, dispatch } = useCustomer();
  const { session, status } = useUserSession({});

  useEffect(() => {
    if (!session || !session.user) return;

    dispatch({
      action: 'sign-in', payload: {
        email: session.user.email,
        password: session.user.name,
      }
    });
  }, [session]);

  console.log('customer', customer);

  return (
    <div>BookSchedule</div>
  );
}
