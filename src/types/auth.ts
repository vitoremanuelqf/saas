export interface IConfirmNewPassword {
  oobCode: string;
  newPassword: string;
}

export interface IResetPassword {
  email: string;
}

export interface IUserSignIn {
  email: string;
  password: string;
}

export interface IUserSignUp {
  displayName: string;
  email: string;
  password: string;
}
