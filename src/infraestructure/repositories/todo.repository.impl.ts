import { TodoDatasource } from "../../domain/datasources/todo.datasources";
import {
  CreateTodoDTO,
  TodoEntity,
  TodoRespository,
  UpdateTodoDto,
} from "../../domain";

export class TodoRepositoryImpl implements TodoRespository {
  constructor(private readonly datasource: TodoDatasource) {}

  create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }

  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: number): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.updateById(updateTodoDto);
  }
  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }
}
