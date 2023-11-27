import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDTO } from "../dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../dtos/todos/update-todo.dto";

export abstract class TodoRespository {
  abstract create(createTodoDto: CreateTodoDTO): Promise<TodoEntity>;
  abstract getAll(): Promise<TodoEntity[]>;
  abstract findById(id: number): Promise<TodoEntity>;
  abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
  abstract deleteById(id: number): Promise<TodoEntity>;
}
