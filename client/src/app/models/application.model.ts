export interface Application {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
}