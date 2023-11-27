import { TodoEntity } from "../../entities/todo.entity";
import { TodoRespository } from "../../repositories/todo.repository";

export interface DeletetTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements DeletetTodoUseCase {
  constructor(private readonly repository: TodoRespository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.deleteById(id);
  }
}
