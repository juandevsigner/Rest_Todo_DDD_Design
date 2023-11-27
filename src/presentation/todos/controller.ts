import { Request, Response } from "express";
import { CreateTodoDTO, UpdateTodoDto } from "../../domain/dtos";
import { TodoRespository } from "../../domain/repositories/todo.repository";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  UpdateTodo,
} from "../../domain";

export class TodosController {
  constructor(private readonly todoRespository: TodoRespository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRespository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({ error }));
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    new GetTodo(this.todoRespository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDTO.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateTodo(this.todoRespository)
      .execute(createTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });
    new UpdateTodo(this.todoRespository)
      .execute(updateTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public deteleTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    new DeleteTodo(this.todoRespository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
}
