import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  TaskService,
} from './task.service';
import { CreateTaskReqDto, TaskDto, UpdateTaskReqDto } from './dto/task.dto';
import { PaginationReqDto, PaginationRespDto } from 'src/common/dto/pagination.dto';

@Controller('tasks')
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get('')
  async list(
    @Query() { limit, offset }: PaginationReqDto,
  ): Promise<PaginationRespDto<TaskDto[]>> {
    return this.service.list({
      ...(limit && { limit: Number(limit) }),
      ...(offset && { offset: Number(offset) }),
    });
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<TaskDto> {
    return this.service.get(id);
  }

  @Post('')
  async create(@Body() data: CreateTaskReqDto): Promise<TaskDto> {
    return this.service.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateTaskReqDto,
  ): Promise<TaskDto> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}
