export type DataResponse = {
  pagination?: PaginationResponse;
  results?: Record<string, unknown> | Record<string, unknown>[];
  warnings?: string[];
};

export type PaginationResponse = {
  page: number;
  totalPages: number;
  totalItems: number;
};

export type ResponseObject = {
  status: 'success' | 'error' | 'info' | 'warning';
  message?: string;
  data: DataResponse;
  code: number;
  meta?: unknown;
};

export const entityTypes = {
	CLIENT: 'CLIENT',
	BANK: 'BANK',
} as const;