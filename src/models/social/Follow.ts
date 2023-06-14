import { Entity, Check, PrimaryColumn } from 'typeorm';

@Entity('UtilisateurSuivis')
@Check('"idUtilisateur" != "idUtilisateurSuivi"')
export class Follow {
	@PrimaryColumn()
	idUtilisateur!: string;

	@PrimaryColumn()
	idUtilisateurSuivi!: string;
}
