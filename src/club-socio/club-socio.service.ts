import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubEntity } from '../club/club.entity';
import { SocioEntity } from '../socio/socio.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ClubSocioService {

  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
    @InjectRepository(SocioEntity)
    private readonly socioRepository: Repository<SocioEntity>
  ) { }

  async addSocioToClub(clubId: string, socioId: string): Promise<ClubEntity> {
    const socio: SocioEntity = await this.socioRepository.findOne({ where: { id: socioId }, relations: ["clubes"] });
    if (!socio)
      throw new BusinessLogicException("No se encontró el socio con la identificación enviada", BusinessError.NOT_FOUND);
    const club: ClubEntity = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["socios"] })
    if (!club)
      throw new BusinessLogicException("No se encontró la club con la identificación proporcionada.", BusinessError.NOT_FOUND);
    club.socios = [...club.socios, socio];
    return await this.clubRepository.save(socio);
  }

  async findSociosFromClub(clubId: string): Promise<SocioEntity[]> {
    const club: ClubEntity = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["socios"] });
    if (!club)
      throw new BusinessLogicException("No se encontró el club con la identificación proporcionada.", BusinessError.NOT_FOUND)
    return club.socios;
  }

  async findSocioFromClub(clubId: string, socioId: string): Promise<SocioEntity> {
    const socio: SocioEntity = await this.socioRepository.findOne({ where: { id: socioId }, relations: ["clubes"] });
    if (!socio)
      throw new BusinessLogicException("No se encontró el socio con la identificación enviada", BusinessError.NOT_FOUND)
    const club: ClubEntity = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["socios"] });
    if (!club)
      throw new BusinessLogicException("No se encontró la club con la identificación proporcionada.", BusinessError.NOT_FOUND)
    const clubsocio: SocioEntity = club.socios.find(e => e.id === socio.id);
    if (!clubsocio)
      throw new BusinessLogicException("El club con el id proporcionado no está relacionado al socio.", BusinessError.PRECONDITION_FAILED)
    return clubsocio;
  }

  async updateSociosFromClub(clubId: string, socios: SocioEntity[]): Promise<ClubEntity> {
    const club: ClubEntity = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["socios"] });
    if (!club)
      throw new BusinessLogicException("No se encontró el club con la identificación proporcionada.", BusinessError.NOT_FOUND)
    for (let i = 0; i < socios.length; i++) {
      const socio: SocioEntity = await this.socioRepository.findOne({ where: { id: `${socios[i].id}` } });
      if (!socio)
        throw new BusinessLogicException("No se encontró el socio con la identificación dada", BusinessError.NOT_FOUND)
    }
    club.socios = socios;
    return await this.clubRepository.save(club);
  }

  async deleteMemberFromClub(clubId: string, socioId: string) {
    const socio: SocioEntity = await this.socioRepository.findOne({ where: { id: socioId }, relations: ["clubes"] });
    if (!socio)
      throw new BusinessLogicException("No se encontró el socio con la identificación dada", BusinessError.NOT_FOUND)
    const club: ClubEntity = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["socios"] });
    if (!club)
      throw new BusinessLogicException("No se encontró el club con la identificación proporcionada.", BusinessError.NOT_FOUND)
    const clubsocio: SocioEntity = club.socios.find(e => e.id === socio.id);

    if (!clubsocio)
      throw new BusinessLogicException("El socio con el id proporcionado no está relacionado al club.", BusinessError.PRECONDITION_FAILED)

    club.socios = club.socios.filter(e => e.id !== socioId);
    await this.clubRepository.delete(club);
  }


}
