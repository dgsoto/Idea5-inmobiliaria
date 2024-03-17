import * as crypto from 'crypto';
import { IEncryptService } from '../../domain/services/IEncryptService';

// Clase que representa a un usuario con sus claves públicas y privadas
export class EncryptService implements IEncryptService {
  private asymmetricKeyPair: crypto.KeyPairSyncResult<string, string>;
  private symmetricKey: Buffer;

  constructor() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    this.asymmetricKeyPair = { publicKey, privateKey } as crypto.KeyPairSyncResult<string, string>;
    this.symmetricKey = crypto.randomBytes(32);
  }

  async encrypt(message: string): Promise<string> {
    const encryptedSymmetricKey = crypto.publicEncrypt(this.asymmetricKeyPair.publicKey, this.symmetricKey);
    const cipher = crypto.createCipheriv('aes-256-ctr', this.symmetricKey, Buffer.from('0000000000000000', 'hex'));
    let encryptedMessage = cipher.update(message, 'utf8', 'hex');
    encryptedMessage += cipher.final('hex');

    return `${encryptedSymmetricKey.toString('base64')}:${encryptedMessage}`;
  }

  async decrypt(encryptedData: string): Promise<string> {
    const [encryptedSymmetricKeyBase64, encryptedMessage] = encryptedData.split(':');
    const encryptedSymmetricKey = Buffer.from(encryptedSymmetricKeyBase64, 'base64');
    const symmetricKey = crypto.privateDecrypt(this.asymmetricKeyPair.privateKey, encryptedSymmetricKey);

    const decipher = crypto.createDecipheriv('aes-256-ctr', symmetricKey, Buffer.from('0000000000000000', 'hex'));
    let decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8');
    decryptedMessage += decipher.final('utf8');

    return decryptedMessage;
  }
}
