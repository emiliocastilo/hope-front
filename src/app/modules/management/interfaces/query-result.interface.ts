import { Pageable } from './pageable.interface';
import { Sort } from './sort.interface';

export interface QueryResult<T> {
  content: Array<T>;
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
