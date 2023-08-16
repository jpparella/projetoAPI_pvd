import { Entity, PrimaryColumn, Column } from "typeorm";


@Entity()
export class USUARIO{
    @PrimaryColumn()
    ID: string;

    @Column()
    LOGIN: string;

    @Column()
    EMAIL: string;

    @Column()
    SENHA: string;
}