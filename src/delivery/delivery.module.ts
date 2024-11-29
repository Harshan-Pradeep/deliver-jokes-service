import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Joke } from './entities/delivery.entity';
import { Type } from './entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Joke, Type])],
  controllers: [DeliveryController],
  providers: [DeliveryService]
})
export class DeliveryModule {}
