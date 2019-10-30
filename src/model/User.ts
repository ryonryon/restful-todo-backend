class User {
  userId: number;
  name: string;
  email: string;

  constructor(userId: number = NaN, name: string, email: string) {
    this.userId = userId;
    this.name = name;
    this.email = email;
  }
}

export default User;
