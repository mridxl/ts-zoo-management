export type Admin = {
    id: string;
    name: string;
    email: string;
    password: string;
}

export type Animal = {
    id: string;
    name: string;
    species: string;
    age: number;
    gender: Gender;
    health_status: HealthStatus;
    arrival_date: Date;
    enclosureId?: string;
}

export type Enclosure = {
    id: string;
    name: string;
    type: string;
    capacity: number;
    condition: string;
    location: string;
    animals: Animal[];
    createdAt : Date;
    updatedAt: Date;
}

enum Gender {
    Male,
    Female
}

enum HealthStatus {
  Healthy,
  Sick,
  Injured,
  Recovering,
  Critical,
  UnderTreatment,
}
