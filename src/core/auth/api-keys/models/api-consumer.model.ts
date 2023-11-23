import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IRoutableResource } from '@app/core/resource-identifiers/routable-resource.contract';

export type ApiConsumerDocument = HydratedDocument<ApiConsumer>;

@Schema()
export class ApiConsumer implements IRoutableResource {
  @Prop({ required: true, unique: true })
  resourceIdentifier: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  apiKey: string;
}

export const ApiConsumerSchema = SchemaFactory.createForClass(ApiConsumer);
