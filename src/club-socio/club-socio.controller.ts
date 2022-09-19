import { Controller, Post, Param, Get, Put, Body, Delete, HttpCode } from '@nestjs/common';
import { SocioDto } from 'src/socio/socio.dto';
import { ClubSocioService } from './club-socio.service';
import { plainToInstance } from 'class-transformer';
import { SocioEntity } from 'src/socio/socio.entity';

@Controller('clubs')
export class ClubSocioController {

  constructor(private readonly clubSocioService: ClubSocioService) { }

  @Post(':clubId/members/:socioId')
  async addSocioToClub(@Param('clubId') clubId: string, @Param('socioId') socioId: string) {
    return await this.clubSocioService.addSocioToClub(clubId, socioId);
  }

  @Get(':clubId/members')
  async findSociosFromClub(@Param('clubId') clubId: string) {
    return await this.clubSocioService.findSociosFromClub(clubId);
  }

  @Get(':clubId/members/:socioId')
  async findSocioFromClub(@Param('clubId') clubId: string, @Param('socioId') socioId: string) {
    return await this.clubSocioService.findSocioFromClub(clubId, socioId);
  }

  @Put(':clubId/members')
  async updateSociosFromClub(@Body() socioDto: SocioDto[], @Param('clubId') clubId: string) {
    const socios = plainToInstance(SocioEntity, socioDto)
    return await this.clubSocioService.updateSociosFromClub(clubId, socios);
  }

  @Delete(':clubId/members/:socioId')
  @HttpCode(204)
  async deleteSocioFromClub(@Param('clubId') clubId: string, @Param('socioId') socioId: string) {
    return await this.clubSocioService.deleteMemberFromClub(clubId, socioId);
  }

}
