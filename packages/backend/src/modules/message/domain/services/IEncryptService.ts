export interface IEncryptService {
  encrypt(message: string): Promise<string>;
  decrypt(encryptedMessage: string): Promise<string>;
}
