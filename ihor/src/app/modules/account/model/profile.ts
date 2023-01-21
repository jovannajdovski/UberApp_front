export interface Profile {
  name: string;
  surname: string;
  profilePicture: string|null;
  telephoneNumber: string;
  email: string;
  address: string;
}

export interface ProfileWPassword {
  name: string;
  surname: string;
  profilePicture: string|null;
  telephoneNumber: string;
  email: string;
  address: string;
  password: string;
}