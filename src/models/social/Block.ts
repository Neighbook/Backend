import { Entity, Check, PrimaryColumn } from 'typeorm';

@Entity('UtilisateurBloques')
@Check('"idUtilisateur" != "idUtilisateurBloque"')
export class Block {
	@PrimaryColumn()
	idUtilisateur!: string;

	@PrimaryColumn()
	idUtilisateurBloque!: string;
}
