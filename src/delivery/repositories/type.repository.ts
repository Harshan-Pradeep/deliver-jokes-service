import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from '../entities/type.entity';
import { ITypeRepository } from './type.repository.interface';
import { CreateTypeDto } from '../dto/create-type.dto';

@Injectable()
export class TypeRepository implements ITypeRepository {
    constructor(
        @InjectRepository(Type)
        private readonly typeRepository: Repository<Type>,
    ) { }

    async findAll(): Promise<Type[]> {
        return this.typeRepository.find();
    }

    async findByName(name: string): Promise<Type | null> {
        return this.typeRepository.findOne({ where: { name } });
    }

    async create(createTypeDto: CreateTypeDto): Promise<Type> {
        const newType = this.typeRepository.create(createTypeDto);
        return await this.typeRepository.save(newType);
    }
}
