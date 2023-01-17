import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('UtilisateurBloque')
export class Block {
    @PrimaryGeneratedColumn()
    Id!: number

    @Column()
    IdUtilisateur!: string;

    @Column()
    IdUtilisateurBloque!: string;
}
