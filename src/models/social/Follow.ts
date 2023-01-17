import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('UtilisateurSuivi')
export class Follow {
    @PrimaryGeneratedColumn()
    Id!: number

    @Column()
    IdUtilisateur!: string;

    @Column()
    IdUtilisateurSuivi!: string;
}
