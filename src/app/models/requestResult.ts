export class RequestResult<T> {

  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  errors: string[];
  result: T;

  constructor() {
    this.isSuccess = false;
    this.isError = false;
    this.errorMessage = '';
    this.errors = [];
    this.result;
  }
}
