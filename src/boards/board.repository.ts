import { DataSource, EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomRepository } from "src/database/typeorm-ex.decorator";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {}
