import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class ResourceIdentifierService {
  /**
   * Generates a unique identifier for the given resource type.
   *
   * @param {string} resourceType - The type of the resource.
   * @param {number} [length] - The length of the random part. Optional.
   * @returns {string} - A unique identifier generated using the resource type and random part.
   */
  generateUniqueId(resourceType: string, length?: number): string {
    const randomPart = this.generateRandomPart(length);
    return `${resourceType}_${randomPart}`;
  }

  /**
   * Generates a random string of specified length using randomBytes method.
   *
   * @param {number} [length=12] - The length of the random string to be generated. Defaults to 12.
   * @returns {string} - The randomly generated string.
   */
  private generateRandomPart(length: number = 12): string {
    const randomBytesBuffer = randomBytes(Math.ceil(length / 2));
    return randomBytesBuffer.toString('hex').slice(0, length);
  }
}
