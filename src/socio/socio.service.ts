import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocioEntity } from './socio.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

const REG_EXP_EMAIL = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/";

@Injectable()
export class SocioService {
  constructor(
    @InjectRepository(SocioEntity)
    private readonly socioRepository: Repository<SocioEntity>
  ){}

  async findAll(): Promise<SocioEntity[]> {
    return await this.socioRepository.find({ relations: ["clubes"]});
  }

  async findOne(id: string): Promise<SocioEntity> {
    const socio: SocioEntity = await this.socioRepository.findOne({where: {id}, relations: ["culturasGastronomicas", "pais"]});
    if (!socio)
        throw new BusinessLogicException("No se encontró el socio con la identificación proporcionada.", BusinessError.NOT_FOUND);
    return socio;
  }

  async create(socio: SocioEntity): Promise<SocioEntity> {
    return await this.socioRepository.save(socio);
  }

  async update(id: string, socio: SocioEntity): Promise<SocioEntity> {
    const persisteSocio: SocioEntity = await this.socioRepository.findOne({where:{id}});
    if (!persisteSocio)
      throw new BusinessLogicException("No se encontró el socio con la identificación proporcionada.", BusinessError.NOT_FOUND);
    socio.id = id;
    return await this.socioRepository.save(socio);
  }

  async delete(id: string) {
    const socio: SocioEntity = await this.socioRepository.findOne({where:{id}});
    if (!socio)
      throw new BusinessLogicException("No se encontró el socio con la identificación proporcionada.", BusinessError.NOT_FOUND);
    await this.socioRepository.remove(socio);
  }

}
