import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "../schema/book.schema";
import { User } from "src/auth/schema/user.schema";

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    readonly title: string;
    
    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsString()
    readonly author: string

    @IsOptional()
    @IsNumber()
    readonly price: number;

    @IsOptional()
    @IsEnum(Category, { message: 'Category must be either Fiction, NonFiction, Science, History, Biography' })
    readonly category: Category;

    @IsEmpty({ message: 'User field cannot be set manually.' })
    readonly user: User;
}