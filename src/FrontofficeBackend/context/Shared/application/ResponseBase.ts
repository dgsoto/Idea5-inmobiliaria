export class ResponseBase<T> {
  succesed: boolean;
  message?: string;
  error?: Error;
  data?: T;

  constructor(succesed: boolean, message: string = '', data?: T, error?: Error) {
    this.succesed = succesed;
    this.message = message;
    this.error = error;
    this.data = data;
  }
}

export class Error {
  code: string;
  status_code: string;
  messages: string[];

  constructor(code: string, status_code: string, messages: string[]) {
    this.code = code;
    this.status_code = status_code;
    this.messages = messages;
  }
}
