import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ApiConsumer,
  ApiConsumerDocument,
} from '@app/core/auth/api-keys/models/api-consumer.model';
import * as crypto from 'crypto';
import { ResourceIdentifierService } from '@app/core/resource-identifiers/resource-identifier.service';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectModel(ApiConsumer.name)
    private readonly _consumerModel: Model<ApiConsumer>,
    private readonly _resourceIdentifierService: ResourceIdentifierService,
  ) {}

  /**
   * Finds a consumer by its API key.
   *
   * @param {string} apiKey - The API key of the consumer to find.
   * @return {Promise<ApiConsumerDocument>} - A Promise that resolves to the Consumer document found.
   */
  async findOneConsumerByApiKey(apiKey: string): Promise<ApiConsumerDocument> {
    return await this._consumerModel.findOne({ apiKey }).exec();
  }

  async createConsumerAsync(data: { name: string }) {
    const consumer = new this._consumerModel({
      apiKey: this.generateApiKey('live'),
      resourceIdentifier:
        this._resourceIdentifierService.generateUniqueId('consumer'),
      name: data.name,
    });
    return consumer.save();
  }

  /**
   * Verifies the API key by finding a consumer with the given API key.
   * @param {string} apiKey - The API key to be verified.
   * @return {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the API key is valid or not.
   */
  async verifyApiKey(apiKey: string): Promise<boolean> {
    const consumer = await this.findOneConsumerByApiKey(apiKey);
    return !!consumer;
  }

  /**
   * Generates an API key based on the specified environment.
   * @param {string} environment - The environment for which to generate the API key ('live').
   * @returns {string} - The generated API key.
   */
  generateApiKey(environment: 'live'): string {
    const key = crypto.randomBytes(48).toString('hex'); // generate 96 chars long key
    return `sk_${environment}_${key}`;
  }
}
