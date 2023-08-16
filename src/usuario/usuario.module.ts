import { Module } from '@nestjs/common';
import { EmailUnicoValidator } from 'src/validacao/email-unico.validator';
import { DatabaseModule } from '../database/database.module';
import { UsuarioController } from './usuario.controller';
import { usuarioProviders } from './usuario.providers';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [
    ...usuarioProviders,
    UsuarioService,
    EmailUnicoValidator,
  ],
})
export class UsuarioModule {}///....