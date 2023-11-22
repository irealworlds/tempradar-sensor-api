import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IRoutableResource } from '../../core/resource-identifiers/routable-resource.contract';

export type SensorDocument = HydratedDocument<Sensor>;

@Schema()
export class Sensor implements IRoutableResource {
  @Prop({ required: true, unique: true })
  resourceIdentifier: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  macAddress: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: new Date() })
  createdAt: Date = new Date();
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
