import { web3formsKey } from '@/content/site';

// Sends a form to Web3Forms, which emails it on to Lena. Resolves true when
// it has gone through.
export async function sendToInbox(data: FormData, subject: string): Promise<boolean> {
  data.append('access_key', web3formsKey);
  data.append('subject', subject);
  data.append('from_name', 'Lena in the Wild website');
  try {
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
    const json = await res.json();
    return Boolean(json.success);
  } catch {
    return false;
  }
}
