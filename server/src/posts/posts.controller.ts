import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) { }

    @Get()
    findAll() {
        return this.postsService.findAll()
    }

    @Post()
    create(@Body() post: { title: string, text: string }) {
        return this.postsService.create(post)
    }

    @Put(':postId')
    updateOne(@Param('postId') postId: number, @Body() updatedPost: { title: string, text: string }) {
        return this.postsService.updateOne(postId, updatedPost)
    }

    @Delete(':postId')
    deleteOne(@Param('postId') postId: number) {
        return this.postsService.deleteOne(postId)
    }

}
