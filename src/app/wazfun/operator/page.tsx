import { redirect } from 'next/navigation';

export default function WazfunOperatorRedirect() {
  // Redirect to the new system-based URL
  redirect('/systems/wazfun/operator');
}
