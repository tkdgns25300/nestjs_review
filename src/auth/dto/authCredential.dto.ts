import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	username: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	// 영어와 숫자만 가능
	@Matches(/^[a-zA-Z0-9]*$/, {
		message: "password only accepts english and number",
	})
	password: string;
}
