export interface Session {
  id: number;
  rooms: Room[];
  groups: Group[];
  users: User[];
  type: IdName;
  status: IdName;
  module: string;
  start: string;
  end: string;
}

export interface Room {
  id: number;
  name: string;
  devices: Device[];
  responsible: Responsible | null;
  description: string;
  address: string;
  is_active: boolean;
}

export interface Device {
  // пока пустой, так как в JSON []
  // можно уточнить структуру, если появится
}

export interface Responsible {
  id: number;
  role: IdName;
  groups: Group[];
  login: string;
  name: string;
  email: string;
  is_active: boolean;
}

export interface Group {
  id: number;
  users: User[];
  teacher: User;
  name: string;
  speciality: string;
  is_active: boolean;
}

export interface User {
  id: number;
  login: string;
  name: string;
  email: string;
}

export interface IdName {
  id: number;
  name: string;
}
