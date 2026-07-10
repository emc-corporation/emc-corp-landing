import { api } from './instance';

export interface SubmitPayload {
  name: string;
  phone: string;
  email: string;
  company: string;
  interest: string;
  volume: string;
  comment: string;
}

export function submitApplication(data: SubmitPayload) {
  return api.post('/submit', data);
}
