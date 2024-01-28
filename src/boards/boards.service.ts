import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus } from "./boardStatus.enum";
import { v1 as uuid } from "uuid";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardRepository } from "./board.repository";
import { Board } from "./board.entity";
import { User } from "src/auth/user.entity";

@Injectable()
export class BoardsService {
	constructor(
		@InjectRepository(BoardRepository)
		private boardRepository: BoardRepository,
	) {}

	async getBoardById(id: number): Promise<Board> {
		const found = await this.boardRepository.findOneBy({ id });

		if (!found) throw new NotFoundException(`Can't find Board with id ${id}`);

		return found;
	}

	async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto, user);
	}

	async deleteBoard(id: number, user: User): Promise<void> {
		const result = await this.boardRepository.delete({ id, user });

		if (result.affected === 0) {
			throw new NotFoundException(`Can't find Board with id ${id}`);
		}

		console.log("result", result);
	}

	async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
		const board = await this.getBoardById(id);

		board.status = status;
		await this.boardRepository.save(board);

		return board;
	}

	async getAllBoards(user: User): Promise<Board[]> {
		const query = this.boardRepository.createQueryBuilder("board");
		query.where(`board.userId = :userId`, { userId: user.id });

		const boards = await query.getMany();
		return boards;
	}

	// getAllBoards(): Board[] {
	// 	return this.boards;
	// }
	// getBoardById(id: string): Board {
	// 	const found = this.boards.find((board) => board.id === id);
	// 	if (!found) throw new NotFoundException(`Can't find board with ID ${id}`);
	// 	return found;
	// }
	// createBoard(createBoardDto: CreateBoardDto): Board {
	// 	const { title, description } = createBoardDto;
	// 	const board: Board = {
	// 		id: uuid(),
	// 		title,
	// 		description,
	// 		status: BoardStatus.PUBLIC,
	// 	};
	// 	this.boards.push(board);
	// 	return board;
	// }
	// deleteBoard(id: string): void {
	// 	const found = this.getBoardById(id);
	// 	this.boards = this.boards.filter((board) => board.id !== found.id);
	// }
	// updateBoardStatus(id: string, status: BoardStatus): Board {
	// 	const board = this.getBoardById(id);
	// 	board.status = status;
	// 	return board;
	// }
}
