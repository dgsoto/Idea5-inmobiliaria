export class ResponseBase<T> {
  succesed: boolean
  message?: string
  errors?: any
  data?: T

  constructor(succesed: boolean, message: string = '', errors: object = {}, data?: T) {
    this.succesed = succesed
    this.message = message
    this.errors = errors
    this.data = data
  }
}
