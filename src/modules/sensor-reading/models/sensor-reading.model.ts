import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Sensor } from '../../sensor/sensor.model';

export type SensorReadingDocument = HydratedDocument<SensorReading>;

@Schema()
export class SensorReading {
  @Prop({ required: true, unique: true })
  resourceIdentifier: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sensor' })
  sensor: Sensor;

  @Prop()
  temperature?: number;

  @Prop()
  humidity?: number;

  @Prop()
  airQuality?: number;

  @Prop({ default: new Date() })
  createdAt: Date = new Date();
}

export const SensorReadingSchema = SchemaFactory.createForClass(SensorReading);
