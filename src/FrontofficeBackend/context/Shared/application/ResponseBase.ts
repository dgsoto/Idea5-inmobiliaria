export class ResponseBase<T> {
  succesed: boolean;
  code: number;
  status_code: string;
  message?: string;
  errors?: string[];
  data?: T;

  constructor(succesed: boolean, code: number, status_code: string, message?: string, data?: T, errors?: string[]) {
    this.succesed = succesed;
    this.code = code;
    this.status_code = status_code;
    this.message = message;
    this.errors = errors;
    this.data = data;
  }
}
