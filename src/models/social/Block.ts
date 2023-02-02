import {Entity, PrimaryColumn} from 'typeorm';

@Entity('UtilisateurBloques')
export class Block {
    @PrimaryColumn()
    idUtilisateur!: string;

    @PrimaryColumn()
    idUtilisateurBloque!: string;
}
