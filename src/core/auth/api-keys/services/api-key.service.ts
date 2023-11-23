import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiConsumer, ApiConsumerDocument } from '../models/api-consumer.model';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectModel(ApiConsumer.name)
    private readonly _consumerModel: Model<ApiConsumer>,
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

  /**
   * Verifies the API key by finding a consumer with the given API key.
   * @param {string} apiKey - The API key to be verified.
   * @return {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the API key is valid or not.
   */
  async verifyApiKey(apiKey: string): Promise<boolean> {
    const consumer = await this.findOneConsumerByApiKey(apiKey);
    return !!consumer;
  }
}
