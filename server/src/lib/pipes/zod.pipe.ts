import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Paramtype,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(
    private readonly schema: ZodSchema,
    private readonly type: Paramtype,
  ) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (this.type !== metadata.type) {
      return value;
    }

    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return result.data;
  }
}
