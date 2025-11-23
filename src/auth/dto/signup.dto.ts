import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;
    
    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter correct email." })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: "Password is too short. Minimum length is 6 characters." })
    readonly password: string;

    @IsOptional()
    readonly role: string;
}