import { Module } from "@nestjs/common";
import { BoardsModule } from "./boards/boards.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./configs/typeorm.config";
import { TypeOrmExModule } from "./database/typeorm-ex.module";
import { BoardRepository } from "./boards/board.repository";
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule, AuthModule],
})
export class AppModule {}
