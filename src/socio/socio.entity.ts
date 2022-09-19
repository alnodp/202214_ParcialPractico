import { ClubEntity } from "../club/club.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

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

  @ManyToMany(() => ClubEntity, (club) => club.socios)
  clubes: ClubEntity[];

}
