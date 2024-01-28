import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { BoardStatus } from "./boardStatus.enum";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { BoardStatusValidationPipe } from "./pipes/boardStatusValidation.pipe";
import { Board } from "./board.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/getUser.decorator";
import { User } from "src/auth/user.entity";

@Controller("boards")
@UseGuards(AuthGuard())
export class BoardsController {
	private logger = new Logger("BoardsController");
	constructor(private boardsService: BoardsService) {}

	@Get("/:id")
	getBoardById(@Param("id") id: number): Promise<Board> {
		return this.boardsService.getBoardById(id);
	}

	@Post("/")
	@UsePipes(ValidationPipe)
	createboard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User): Promise<Board> {
		this.logger.verbose(
			`User "${user.username}" creating a new board. Payload: ${JSON.stringify(createBoardDto)}`,
		);
		return this.boardsService.createBoard(createBoardDto, user);
	}

	@Delete("/:id")
	deleteBoard(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
		return this.boardsService.deleteBoard(id, user);
	}

	@Patch("/:id/status")
	updateBoardStatus(
		@Param("id", ParseIntPipe) id: number,
		@Body("status", BoardStatusValidationPipe) status: BoardStatus,
	): Promise<Board> {
		return this.boardsService.updateBoardStatus(id, status);
	}

	@Get("/")
	getAllBoard(@GetUser() user: User): Promise<Board[]> {
		this.logger.verbose(`User "${user.username}" trying to get all boards`);
		return this.boardsService.getAllBoards(user);
	}

	// @Get("/")
	// getAllBoard(): Board[] {
	// 	return this.boardsService.getAllBoards();
	// }

	// @Get("/:id")
	// getBoardById(@Param("id") id: string): Board {
	// 	return this.boardsService.getBoardById(id);
	// }

	// @Post("/")
	// @UsePipes(ValidationPipe)
	// createBoard(@Body() createBoardDto: CreateBoardDto): Board {
	// 	return this.boardsService.createBoard(createBoardDto);
	// }

	// @Delete("/:id")
	// deleteBoard(@Param("id") id: string): void {
	// 	this.boardsService.deleteBoard(id);
	// }

	// @Patch("/:id/status")
	// updateBoardStatus(
	// 	@Param("id") id: string,
	// 	@Body("status", BoardStatusValidationPipe) status: BoardStatus,
	// ): Board {
	// 	return this.boardsService.updateBoardStatus(id, status);
	// }
}
