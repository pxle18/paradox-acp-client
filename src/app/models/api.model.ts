export interface Api<T> {
  error?: string;
	data?: T;
  count?: number;
}