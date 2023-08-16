import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import {v4 as uuid} from 'uuid';
import { USUARIO } from './usuario.entity';
import { CriaUsuarioDTO } from './dto/usuario.dto';
import { AlteraUsuarioDTO } from './dto/atualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')///....
    private usuarioRepository: Repository<USUARIO>,
  ) {}

  async listar(): Promise<USUARIO[]> {
    return this.usuarioRepository.find();
  }

  async validaEmail(EMAIL: string){
    const possivelUsuario = this.usuarioRepository.find({
        where: {
          EMAIL,
        },
    });
    return (possivelUsuario == undefined);
   }

  async inserir(dados: CriaUsuarioDTO): Promise<RetornoCadastroDTO>{
    let usuario = new USUARIO();
        usuario.ID = uuid();
        usuario.LOGIN = dados.LOGIN;
        usuario.EMAIL = dados.EMAIL;
        usuario.SENHA = dados.SENHA;

    return this.usuarioRepository.save(usuario)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: usuario.ID,
        message: "Usuario cadastrada!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })

    
  }

  localizarID(ID: string): Promise<USUARIO> {
    return this.usuarioRepository.findOne({
      where: {
        ID,
      },
    });
  }
  
  async remover(id: string): Promise<RetornoObjDTO> {
    const usuario = await this.localizarID(id);
    
    return this.usuarioRepository.remove(usuario)
    .then((result) => {
      return <RetornoObjDTO>{
        return: usuario,
        message: "Usuario excluida!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: usuario,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: AlteraUsuarioDTO): Promise<RetornoCadastroDTO> {
    const usuario = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          usuario[chave] = valor;
      }
    )

    return this.usuarioRepository.save(usuario)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: usuario.ID,
        message: "Usuario alterada!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao alterar." + error.message
      };
    });
  }
}