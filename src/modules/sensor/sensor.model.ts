import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IRoutableResource } from '@app/core/resource-identifiers/routable-resource.contract';

export type SensorDocument = HydratedDocument<Sensor>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class Sensor implements IRoutableResource {
  @Prop({ required: true, unique: true })
  resourceIdentifier: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  macAddress: string;

  @Prop({ required: true })
  passwordHash: string;
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
