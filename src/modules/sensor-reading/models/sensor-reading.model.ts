import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Sensor } from '@app/modules/sensor/sensor.model';

export type SensorReadingDocument = HydratedDocument<SensorReading>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class SensorReading {
  public readonly _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  resourceIdentifier: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sensor' })
  sensor: Sensor | Types.ObjectId;

  @Prop()
  temperature?: number;

  @Prop()
  humidity?: number;

  @Prop()
  airQuality?: number;
}

export const SensorReadingSchema = SchemaFactory.createForClass(SensorReading);
