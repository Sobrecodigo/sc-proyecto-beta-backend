type DataResponse<TPayload extends object | object[]> = {
  pagination?: PaginationResponse;
  results?: TPayload;
  warnings?: string[];
};

export type PaginationResponse = {
  page: number;
  totalPages: number;
  totalItems: number;
};

export type Response<TPayload extends object | object[]> = {
  status: 'success' | 'error' | 'info' | 'warning';
  message: string;
  data: DataResponse<TPayload>;
  code?: number;
  meta?: unknown;
};
