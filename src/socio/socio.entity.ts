import { ClubEntity } from "../club/club.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class SocioEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuario: string;

  @Column()
  email: string;

  @Column()
  fechaNacimiento: string;

  @ManyToMany(() => ClubEntity, (club) => club.socios)
  @JoinTable()
  clubes: ClubEntity[];

}
