import { CreateTodoDTO } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRespository } from "../../repositories/todo.repository";

export interface CreatetodoUseCase {
  execute(dto: CreateTodoDTO): Promise<TodoEntity>;
}

export class CreateTodo implements CreatetodoUseCase {
  constructor(private readonly repository: TodoRespository) {}

  execute(dto: CreateTodoDTO): Promise<TodoEntity> {
    return this.repository.create(dto);
  }
}
