export class TodoItem {
  constructor(
    public id: number,
    public task: string,
    public complete: boolean = false
  ) {}

  toString(): string {
    return `Id: ${this.id}, Task: ${this.task}, Complete: ${
      this.complete ? "Done" : "In progress"
    }`;
  }

  printDetails(): void {
    console.log(
      `${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`
    );
  }
}
