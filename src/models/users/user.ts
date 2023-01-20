import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, BeforeInsert, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm'
import * as argon from 'argon2'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: number

    @Column()
    prenom!: string

    @Column()
    nom!: string

    @Column()
    sexe!: string

    @Column()
    nom_utilisateur!: string

    @Column()
    date_naissance!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column()
    telephone!: string

    @Column()
    code_pays!: string

    @Column({ nullable: true})
    photo!: string


    @CreateDateColumn()
    date_creation!: Date

    @UpdateDateColumn()
    date_modification!: Date

    @DeleteDateColumn()
    date_suppression!: Date

    @Column({ default: true})
    actif!: boolean

    @BeforeUpdate()
    async hashPassword() {
        this.password = await argon.hash(this.password)
    }

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        this.password = await argon.hash(this.password)
    }

}
