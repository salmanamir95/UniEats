export interface GenericResponse<T> {
  success: boolean;
  data: T | null;
  msg: string | null;
}
