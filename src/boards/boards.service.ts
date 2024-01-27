import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardStatus } from "./boardStatus.enum";
import { v1 as uuid } from "uuid";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardRepository } from "./board.repository";
import { Board } from "./board.entity";

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

	async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto);
	}

	async deleteBoard(id: number): Promise<void> {
		const result = await this.boardRepository.delete(id);

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

	async getAllBoards(): Promise<Board[]> {
		return this.boardRepository.find();
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
