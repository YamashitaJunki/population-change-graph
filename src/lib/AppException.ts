type ToStringOut = string;

export class AppException {
  value: string | number;
  errorMessage: string;
  constructor(value: string | number, errorMessage: string) {
    this.value = value;
    this.errorMessage = errorMessage;
  }
  toString(): ToStringOut {
    return `${this.errorMessage} 値の中身:${this.value}`;
  }
};
