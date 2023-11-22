import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class SensorKeyService {
  public async createKey(): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(
      this._generateRandomKey(parseInt(process.env.SENSOR_KEY_LENGTH ?? '32')),
      salt,
    );
  }
  public async compare(subject: string, hashedKey: string): Promise<boolean> {
    return await bcrypt.compare(subject, hashedKey);
  }

  private _generateRandomKey(length: number): string {
    return randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }
}
