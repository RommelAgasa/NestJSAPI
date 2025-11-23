import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter correct email." })
    readonly email: string;

    @IsNotEmpty()
    readonly password: string
}