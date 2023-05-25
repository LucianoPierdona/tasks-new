import {
  Injectable,
  Logger,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { TaskDto, CreateTaskReqDto, UpdateTaskReqDto } from './dto/task.dto';
import {
  PaginationReqDto,
  PaginationRespDto,
} from 'src/common/dto/pagination.dto';

@Injectable()
export class TaskService {
  tasks: TaskDto[] = [];

  constructor(private readonly logger: PinoLogger) {}

  async get(id: string): Promise<TaskDto> {
    this.logger.info(`get() -> id: ${id}`);

    return this.tasks.find((task) => task.id === id);
  }

  async list({
    limit = 10,
    offset = 0,
  }: PaginationReqDto): Promise<PaginationRespDto<TaskDto[]>> {
    return {
      data: this.tasks.slice(offset, limit + offset),
      limit,
      offset,
      total: this.tasks.length,
    };
  }

  async create(data: CreateTaskReqDto): Promise<TaskDto> {
    const { description, done, title } = data;

    const task = {
      description,
      done,
      title,
      id: (Date.now() * Math.random() * 100000).toString(),
    };

    this.tasks.push(task);

    return task;
  }

  async update(id: string, data: UpdateTaskReqDto): Promise<TaskDto> {
    const { description, done, title } = data;

    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    Object.assign(task, {
      ...(description && { description }),
      ...(done && { done }),
      ...(title && { title }),
    });

    return task;
  }

  async delete(id: string): Promise<boolean> {
    const updatedList = this.tasks.filter((t) => t.id !== id);

    this.tasks = updatedList;

    return true;
  }
}
