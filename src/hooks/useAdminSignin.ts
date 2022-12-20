import { useUserAdmin } from './../providers/user-admin-prodiver/index';
import { useEffect } from 'react';
import Router from 'next/router';

export default function useAdminSignin() {
  const { admin } = useUserAdmin();

  useEffect(() => {
    if (!admin) {
      Router.replace('/sign-in');
    }
  }, [admin]);
}
