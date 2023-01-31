import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('UtilisateurBloques')
export class Block {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    idUtilisateur!: string;

    @Column()
    idUtilisateurBloque!: string;
}
