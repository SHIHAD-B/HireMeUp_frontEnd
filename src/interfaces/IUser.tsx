

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



export interface IUsers {
  _id?: string;
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  language?: string[];
  confirmPassword?: string;
  gender?: string;
  dob?: Date | null;
  profile?: string;
  skills?: string[];
  education?: [{
    _id?: string;
    university: string;
    course: string;
    description?: string;
    from?: Date;
    grade?: string;
    to?: Date;
  }];
  address: {
    houseNumber: string,
    locality: string,
    city: string,
    state: string,
    pin: number,
    country: string
  },
  cv?: string | null;
  about?: string | null;
  experiences?: [{
    _id?: string;
    description?: string;
    designation?: string;
    company?: string;
    from?: Date;
    location?: string;
    to?: Date;
  }];
  contacts?: {
    email?: string;
    instagram?: string;
    linkedin?: string;
    portfolio?: string;
    twitter?: string;
  };
  onlineStatus?: string;
  blocked?: boolean;
  deleted?: boolean;
  subscription: {
    _id?: string,
    subscriptionId: string
    planId: string,
    userId: string,
    name: string,
    start_date: Date,
    end_date: Date
  },
  expiredSubscriptions: [{
    _id?: string,
    subscriptionId: string
    planId: string,
    userId: string,
    name: string,
    start_date: Date,
    end_date: Date
  }]
}

export interface IAddress {
  houseNumber: string,
  locality: string,
  city: string,
  state: string,
  pin: number,
  country: string
}

export interface IAdminData {
  _id?: string,
  name:string,
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
  registration?: string | null;
  license?: string | null;
  tin?: string | null;
  viewdocument: {
    registration: boolean,
    license: boolean,
    tin: boolean,
    financialStatements: boolean,
    references: boolean
}
  financialStatements?: string | null;
  references?: string | null;
  password?: string;
  confirmPassword?: string;
  otp?: string;
}

export interface ISocialLink {
  instagram: string,
  linkedin: string,
  portfolio: string,
  twitter: string,
}

export interface IJobData {
  location: string;
  company_name: string;
  _id?: string,
  companyId: string;
  job_title: string;
  type: string;
  salary_from: number;
  salary_to: number;
  category: string;
  publish:boolean;
  questions: string[];
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
  createdAt: Date;
}


export interface ICategory {
  _id: string;
  description: string | null;
  category: string | null;
  deleted: boolean | null
  createdAt: Date | null;
  editedAt: Date | null;
}


export interface IApplicants {
  _id?: string;
  jobId?: string;
  companyId: string;
  schedule?: {
    date?: Date;
    feedback?: string;
    status?: string;
    time?: string;
    title?: string;
  }[];
  userId?: string;
  createdAt?: Date;
  hiring_status?: string;
  resume?: string;
  answers?: object[],
  hiring_info?: {
    name?: string;
    notes?: string;
  }[];
}



export interface ICompanyData {
  _id?: string;
  email?: string;
  address?: string;
  documents?: string;
  password?: string;
  website?: string;
  deleted?: boolean;
  description?: string;
  status?: string;
  tech_stack?: string[];
  images?: string[];
  titile?: string;
  approval?: string;
  noOfEmployees?: number;
  contact?: {
    instagram: string;
    linkedIn: string;
    twitter: string;
  };
  industry?: string;
  benefits?: {
  }[];
  icon?: string;
  location?: string[];
  founded?: Date;
  company_name?: string;
  employees?: string[];
  createdAt?: Date;
}

export interface IFilterData {
  type: string[];
  category: string[];
  level: string[];
  salary_from: string[];
  salary_to: string[];
}


export interface IPlans {
  _id: string;
  duration: number;
  description: string;
  price: number;
  name: string;
  deleted: boolean;
  editedAt: Date;
  discount: number;
  createdAt: Date;
}

export interface IState {
  iso2: string | number | readonly string[] | undefined;
  id: string,
  name: string
}

export interface IEmployee {
  _id?: string;
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  deleted: boolean;
  isActive: boolean;
  profile: string;

}

export interface INotification extends Document {
  _id?: string;
  recipient: string | null;
  message: String | null;
  sender: string | null;
  type: String | null;
  read: Boolean | null;
  createdAt: Date | null;
}

export interface IMessage {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  type: string;
  createdAt: string;
  status: string;
}

export interface IChat {
  _id: string;
  createdAt: Date;
  message: [];
  participants: string[];
  lastMessage: Date;
}

export interface IPopulatedChat {
  _id: string;
  createdAt: Date;
  message: IMessage[];
  participants: string[];
  lastMessage: Date;
}


export interface ISubscriptions {
  _id?: string;
  userId?: string;
  planId?: string;
  end_date?: Date;
  start_date?: Date;
  paymentId?: string;
  createdAt?: Date;
  status?: string;
}

export interface ISchedule {
  interviewer: string;
  _id?: string;
  userId?: string;
  jobId?: string;
  companyId?: string;
  date?: string;
  title?: string;
  status?: string;
  createdAt?: Date;
  editedAt?: Date;
}

export interface IAdmin {
  _id?: string;
  name: string;
  password: string;
  email: string;
  access: string;
  role: string;
  blocked: Boolean;
  createdAt: Date;
}


