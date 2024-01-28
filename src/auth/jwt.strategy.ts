import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { privateDecrypt } from "crypto";
import { User } from "./user.entity";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
	) {
		super({
			secretOrKey: "Secret1234",
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload) {
		const { username } = payload;
		const user: User = await this.userRepository.findOne({ where: [{ username: username }] });

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
