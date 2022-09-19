import { ClubEntity } from "../club/club.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class SocioEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuario: string;

  @Column()
  email: string;

  @Column()
  fechaNacimiento: Date;

  @OneToMany(() => ClubEntity, (club) => club.socios)
  clubes: ClubEntity[];

}
