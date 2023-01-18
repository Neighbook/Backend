import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('UtilisateurSuivis')
export class Follow {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    idUtilisateur!: string;

    @Column()
    idUtilisateurSuivi!: string;
}
