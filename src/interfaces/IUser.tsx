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

export interface IUserData  {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    otp?:string
}
export interface ICompanyData  {
    companyname?: string;
    email?: string;
    document?:string
    password?: string;
    confirmPassword?: string;
    otp?:string
}