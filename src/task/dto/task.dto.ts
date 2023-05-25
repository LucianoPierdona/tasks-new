import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @IsString()
  @IsDefined()
  id: string;

  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsDefined()
  description: string;

  @IsString()
  @IsDefined()
  done: boolean;
}

export class CreateTaskReqDto {
  @IsString()
  @IsDefined()
  title: string;

  @IsString()
  @IsDefined()
  description: string;

  @IsBoolean()
  @IsDefined()
  done: boolean;
}

export class UpdateTaskReqDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
