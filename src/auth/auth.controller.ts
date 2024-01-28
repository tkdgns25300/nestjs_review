import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/authCredential.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./getUser.decorator";
import { User } from "./user.entity";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("/signup")
	signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.authService.signUp(authCredentialsDto);
	}

	@Post("/singin")
	signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
		return this.authService.signIn(authCredentialsDto);
	}

	@Post("/authTest")
	@UseGuards(AuthGuard())
	test(@GetUser() user: User) {
		console.log("user", user);
	}
}
