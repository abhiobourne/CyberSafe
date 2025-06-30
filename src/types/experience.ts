import { Timestamp } from "firebase/firestore";

export interface Experience {
  id?: string;
  name: string;
  email: string;
  experience: string;
  category: string;
  createdAt: Timestamp;
}
