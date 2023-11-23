import { PaginationMetadataDto } from '@app/core/pagination/pagination-metadata.dto';

export class PaginatedResultDto<TEntity> {
  _metadata: PaginationMetadataDto;
  items: TEntity[];

  constructor(initial?: Partial<PaginatedResultDto<TEntity>>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
