class User {
  id: number;
  name: string;
  email: string;

  constructor(id: number = NaN, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

export default User;
