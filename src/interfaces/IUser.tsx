// import { ReactNode } from "react";

// export interface InputWithIconProps {
//   title: string;
//   name: string;
//   icon: ReactNode;
//   placeholder: string;
//   as: any;
//   theme: string;
// }

// export interface IUserLogin {
//   email: string | null;
//   google?: boolean;
// }

// //  export interface CustomJwtPayload {
// //     name: string;
// //     email: string;
// //   }

// //  export interface UserValues {
// //     email: string;
// //     password?:string;
// //     google?:boolean;
// //   }

export interface IUserState {
  loading: boolean;
  user: IUserType | null;
  error: IErrorType | null;
}

export interface IUserType {
  id: string;
  email: string;
  name: string;
}

export interface IErrorType {
  message: string;
  statusCode?: number;
  code?: string;
  details?: any;
}

// export interface OTPEntersectionProps {
//   email?: string;
//   setOTPExpired?: (expired: boolean) => void;
//   setOTPSec?: (open: boolean) => void;
//   dispatchSignUp: (otp: string[]) => void;
// }

export interface IUserData {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  otp?: string
}
export interface IAdminData {
  _id?: string,
  password?: string,
  email?: string,
  access?: string,
  role?: string,
  blocked?: Boolean,
  createdAt?: Date,
}
export interface IRequests {
  companyname?: string;
  email?: string;
  document?: any
  password?: string;
  confirmPassword?: string;
  otp?: string
}

export interface IJobData{
  companyId: string;
  job_title: string;
  type: string;
  salary_from: number;
  salary_to: number;
  category: string;
  required_skills: string[]; 
  description: string;
  responsibilities: string;
  qualification: string;
  requirements: string;
  benefits: {
    description: string;
    icon: number;
    name: string;
  }[];
  slot: number;
  start_date: string;
  end_date: string;
  level: string;
}


export interface ICategory  {
  _id: string;
  description: String | null;
  category: String | null;
  createdAt: Date | null;
  editedAt: Date | null;
}

export interface ICompanyData {
  approval?: String | null;
  status?: String | null;
  _id?: String | null;
  companyname?: String | null;
  email?: String | null;
  address?: String | null;
  documents?: String | null;
}

export interface IPlans {
  _id: string | null;
  duration: Number | null;
  description: String | null;
  price: Number | null;
  name: String | null;
  editedAt: Date | null;
  discount: Number | null;
  createdAt: Date | null;
}