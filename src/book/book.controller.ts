import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import type { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService){}

    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]>{
        // console.log('Query Params:', query);

        // Pagination
        const resPage = 2; // results per page
        const currentPage = Number(query.page) || 1;
        const skip = resPage * (currentPage - 1);

        // Filtering by keyword
        const keyword = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i' // case insensitive
            }
        } : {};

        return this.bookService.findAll({ ...keyword }, resPage, skip);
    }

    @Post('new') // books/new
    async createBook(
        @Body()
        book: CreateBookDto
    ): Promise<Book>{
        return this.bookService.create(book);
    }

    @Get(':id')
    async getBookById(
        @Param('id')
        id: string
    ): Promise<Book | null>{
        return this.bookService.findById(id);
    }

    @Put(':id')
    async updateBook(
        @Param('id')
        id: string,
        @Body()
        book: UpdateBookDto
    ): Promise<Book | null>{
        return this.bookService.updateById(id, book);
    }
    

    @Delete(':id')
    async deleteBook(
        @Param('id')
        id: string
    ): Promise<Book | null>{
        return this.bookService.deleteById(id);
    }
}