import {Entity, PrimaryColumn} from 'typeorm';

@Entity('UtilisateurSuivis')
export class Follow {
    @PrimaryColumn()
    idUtilisateur!: string;

    @PrimaryColumn()
    idUtilisateurSuivi!: string;
}
