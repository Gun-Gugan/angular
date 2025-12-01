export interface Application {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  image?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
}