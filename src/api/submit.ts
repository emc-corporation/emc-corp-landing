import { api } from './instance';

export interface SubmitPayload {
  name: string;
  phone: string;
  company: string;
  interest: string;
  comment: string;
}

export function submitApplication(data: SubmitPayload) {
  return api.post('/submit', data);
}
