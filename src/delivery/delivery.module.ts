import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Joke } from './entities/delivery.entity';
import { Type } from './entities/type.entity';
import { JokeRepository } from './repositories/joke.repository';
import { TypeRepository } from './repositories/type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Joke, Type])],
  controllers: [DeliveryController],
  providers: [DeliveryService,
    { provide: 'IJokeRepository', useClass: JokeRepository },
    { provide: 'ITypeRepository', useClass: TypeRepository },
  ]
})
export class DeliveryModule { }
