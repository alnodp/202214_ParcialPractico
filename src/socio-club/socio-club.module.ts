import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from '../club/club.entity';
import { SocioEntity } from '../socio/socio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocioEntity, ClubEntity])],
})
export class SocioClubModule {}
