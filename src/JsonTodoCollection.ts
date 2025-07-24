import { LowSync } from "lowdb";
import { TodoCollection } from "./TodoCollection.js";
import { TodoItem } from "./TodoItem.js";
import { JSONFileSync } from "lowdb/node";

type schemaType = {
  tasks: TodoItem[];
};

export class JsonTodoCollection extends TodoCollection {
  private database: LowSync<schemaType>;

  constructor(public userName: string, todoItems: TodoItem[] = []) {
    super(userName, []);
    this.database = new LowSync(new JSONFileSync("Todos.json"), { tasks: [] });
    this.database.read();

    if (this.database.data == null) {
      this.database.data = { tasks: todoItems };
      this.database.write();
      todoItems.forEach((item) => this.itemMap.set(item.id, item));
    } else {
      this.database.data.tasks.forEach((item) =>
        this.itemMap.set(
          item.id,
          new TodoItem(item.id, item.task, item.complete)
        )
      );
    }
  }

  private storeTasks() {
    this.database.data.tasks = [...this.itemMap.values()];
    this.database.write();
  }

  addTodo(task: string): number {
    let result = super.addTodo(task);
    this.storeTasks();
    return result;
  }

  markComplete(id: number, complete: boolean) {
    super.markComplete(id, complete);
    this.storeTasks();
  }

  removeComplete(): void {
    super.removeComplete();
    this.storeTasks();
  }
}
