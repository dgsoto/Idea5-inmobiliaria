import { invalidContentLength } from './Error/invalidContentLength';
export class typeSubject {
  constructor(content: string) {
    if (!this.isValidSubjectLength(content)) {
      throw new invalidContentLength('The content exceeds 250 characters');
    }
  }
  private isValidSubjectLength(content: string): boolean {
    return content.length <= 250;
  }
}
