export interface UserSession {
  name: string;
  password: string;
  image: string;
  email: string;
  roles: string[];
  dni: string
} 

export interface UserLogin {
  name: string;
  password: string;
  dni: string;
}

export interface SessionSgd {
  user: UserSession;
}