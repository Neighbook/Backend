import {Entity, Column} from 'typeorm'

@Entity('UtilisateurBloque')
export class Block {
    @Column()
    IdUtilisateur!: string;

    @Column()
    IdUtilisateurBloque!: string;
}
