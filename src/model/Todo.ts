class Todo {
  title: string;
  createdAt: Date;

  constructor(title: string) {
    this.title = title;
    const now = new Date();
    this.createdAt = now;
  }
}
