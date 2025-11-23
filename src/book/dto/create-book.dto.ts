import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schema/book.schema";
import { User } from "src/auth/schema/user.schema";

export class CreateBookDto {


    /**
     * When you use decorators like:
     * @IsString()
     * @IsNotEmpty()
     * 
     * ...those don’t do anything by themselves.
     * They only mark the DTO properties with metadata.
     * 
     * To actually enforce and trigger the validation when an HTTP request comes in, NestJS needs the ValidationPipe — that’s the middleware responsible for:
     *  1. Checking the incoming data (e.g., from @Body()).
     *  2. Running all the class-validator decorators.
     *  3. Throwing an error if any validation rules are violated.
     *  4. Automatically rejecting invalid requests with 400 Bad Request.
     */
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

    @IsEmpty({ message: 'User field cannot be set manually.' })
    readonly user: User;
}