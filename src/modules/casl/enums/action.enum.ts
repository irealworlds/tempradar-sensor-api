export enum CrudAction {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export enum SensorAction {
  CreateReading = 'sensors.create_readiang',
}

export type TAction = CrudAction | SensorAction;
