import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ClubEntity } from './club.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>
  ){}

  async findAll(): Promise<ClubEntity[]> {
    return await this.clubRepository.find({ relations: ["socios"]});
  }

  async findOne(id: string): Promise<ClubEntity> {
    const club: ClubEntity = await this.clubRepository.findOne({where: {id}, relations: ["socios"]});
    if (!club)
        throw new BusinessLogicException("No se encontró el club con la identificación proporcionada.", BusinessError.NOT_FOUND);
    return club;
  }

  async create(club: ClubEntity): Promise<ClubEntity> {
    return await this.clubRepository.save(club);
  }

  async update(id: string, club: ClubEntity): Promise<ClubEntity> {
    const persisteClub: ClubEntity = await this.clubRepository.findOne({where:{id}});
    if (!persisteClub)
      throw new BusinessLogicException("No se encontró el club con la identificación proporcionada.", BusinessError.NOT_FOUND);
    club.id = id;
    return await this.clubRepository.save(club);
  }

  async delete(id: string) {
    const club: ClubEntity = await this.clubRepository.findOne({where:{id}});
    if (!club)
      throw new BusinessLogicException("No se encontró el club con la identificación proporcionada.", BusinessError.NOT_FOUND);
    await this.clubRepository.remove(club);
  }


}
