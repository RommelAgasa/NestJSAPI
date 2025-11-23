import { Injectable, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Book } from './schema/book.schema';
import { InjectModel } from '@nestjs/mongoose';

import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
    constructor(
        // tells NestJS to inject the Mongoose Model that was registered in MongooseModule.forFeature().
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ){}

    async findAll(query: Query, resPage: number, skip: number): Promise<any>{
        const total = await this.bookModel.countDocuments(query).exec();
        const books = await this.bookModel
            .find(query)
            .limit(resPage)
            .skip(skip)
            .exec();

        return {
            total,
            currentPage: skip / resPage + 1,
            totalPages: Math.ceil(total / resPage),
            books,
        };
    }

    async create(book: Book): Promise<Book>{
        const res = await this.bookModel.create(book);
        return res;
    }

    async findById(id: string): Promise<Book | null> {
        // .exec() returns a real Promise instead of a Mongoose "thenable".
        const book = await this.bookModel.findById(id).exec();

        if(!book){
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        return book;
    }

    async updateById(id: string, book: Book): Promise<Book | null> {
        return await this.bookModel.findByIdAndUpdate(id, book, { 
            new: true, 
            runValidators: true
        }).exec();
    }

    async deleteById(id: string): Promise<Book | null> {
        return await this.bookModel.findByIdAndDelete(id).exec();
    }

}
