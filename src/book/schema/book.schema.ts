import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Category {
    ADVENTURE = 'Adventure',
    CLASSICS = 'Classics',
    CRIME = 'Crime',
    FANTASY = 'Fantasy',
}

/**
 * This creates a TypeScript type alias named BookDocument that combines:
 * Book → your custom class (the structure of your data, with title, author, etc.)
 * Document → the Mongoose base class that adds MongoDB features like _id, save(), toObject(), etc.
 * 
 * So, effectively:
 *  BookDocument = Book + Mongoose Document features
 * 
 * Why it’s needed?
 * When you use NestJS with Mongoose, the documents 
 * returned from the database are not just plain 
 * JavaScript objects — they’re Mongoose documents 
 * that have built-in methods and properties.
 * 
 * For example:
 *      book._id        // comes from Mongoose Document
 *      book.title      // comes from your Book class
 *      book.save()     // comes from Mongoose Document
 */
export type BookDocument = Book & Document;

/**
 * option automatically adds:
 * createdAt
 * updatedAt
 * 
 */
@Schema({ timestamps: true }) 
export class Book {

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ default: 'Unknown' })
    author: string;

    @Prop({ type: Number, min: 0 })
    price: number;

    @Prop()
    category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);