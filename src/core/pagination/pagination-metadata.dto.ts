export class PaginationMetadataDto {
  total: number;

  constructor(initial?: Partial<PaginationMetadataDto>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
