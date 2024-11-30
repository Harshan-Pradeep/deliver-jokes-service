import { CreateTypeDto } from "../dto/create-type.dto";
import { Type } from "../entities/type.entity";

export interface ITypeRepository {
    findAll(): Promise<Type[]>;
    findByName(name: string): Promise<Type | null>;
    create(createTypeDto: CreateTypeDto): Promise<Type>;
}
