import {Entity,Column, PrimaryColumn, OneToMany} from 'typeorm';

@Entity()
export class PESSOA{
    @PrimaryColumn()
    ID: string;

    @Column()
    NOME: string;

    @Column()
    TELEFONE: string;//....

    @Column()
    ENDERECO: string;//....
}