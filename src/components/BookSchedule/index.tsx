import useCustomerSignIn from '~/hooks/useCustomerSignIn';
import { useCustomer } from '~/providers/customer-provider';

export default function BookSchedule() {
  useCustomerSignIn();
  const { customer } = useCustomer();

  console.log(customer);


  return (
    <div>BookSchedule</div>
  );
}
