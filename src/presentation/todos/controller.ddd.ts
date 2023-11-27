import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO, UpdateTodoDto } from "../../domain/dtos";
import { TodoRespository } from "../../domain/repositories/todo.repository";

export class TodosController {
  constructor(private readonly todoRespository: TodoRespository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRespository.getAll();
    return res.json({
      ok: true,
      todos,
    });
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const todo = await this.todoRespository.findById(id);
      return res.json({
        ok: true,
        todo,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDTO.create(req.body);
    if (error) return res.status(400).json({ error });

    const todo = await this.todoRespository.create(createTodoDto!);

    return res.status(200).json({ ok: true, todo });
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });
    const updateTodo = await this.todoRespository.updateById(updateTodoDto!);
    res.json({ ok: true, updateTodo });
  };

  public deteleTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    await this.todoRespository.deleteById(id);

    return res
      .status(200)
      .json({ ok: true, msg: `Todo ${id} was removed correctly` });
  };
}
