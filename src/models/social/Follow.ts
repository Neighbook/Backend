import {Entity, Column} from 'typeorm'

@Entity('UtilisateurSuivi')
export class Follow {
    @Column()
    IdUtilisateur!: string;

    @Column()
    IdUtilisateurSuivi!: string;
}
