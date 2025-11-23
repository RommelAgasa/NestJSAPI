import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schema/book.schema";

export class CreateBookDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;
    
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsEnum(Category, { message: 'Category must be either Fiction, NonFiction, Science, History, Biography' })
    readonly category: Category;
}