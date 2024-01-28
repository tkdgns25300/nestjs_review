import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { BoardStatus } from "./boardStatus.enum";
import { User } from "src/auth/user.entity";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
	async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
		const { title, description } = createBoardDto;

		const board = this.create({
			title,
			description,
			status: BoardStatus.PUBLIC,
			user,
		});

		await this.save(board);
		return board;
	}
}
