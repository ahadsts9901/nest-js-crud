import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
    private posts = []

    findAll() {
        return {
            message: "posts fetched",
            data: this.posts
        }
    }

    create(post: { title: string, text: string }) {

        const { title, text } = post

        if (!title || !text) {
            return {
                message: "title or text missing",
                errorCode: 400
            }
        }

        const newPost = {
            time: new Date().toISOString(),
            id: new Date().getTime(),
            title: title,
            text: text
        }

        this.posts.unshift(newPost)

        return {
            message: "post done"
        }

    }

    updateOne(postId: number, updatedPost: { title?: string, text?: string }) {

        const { title, text } = updatedPost

        if (!postId) {
            return {
                message: "postId missing",
                errorCode: 400
            }
        }

        if (!title && !text) {
            return {
                message: "title or text missing",
                errorCode: 400
            }
        }

        const postIndex = this.posts.findIndex(post => post.id == postId);

        if (postIndex !== -1) {

            this.posts[postIndex].title = title;
            this.posts[postIndex].text = text;

            return {
                message: "post updated"
            }

        } else {
            return {
                message: "post not found",
                errorCode: 404
            }
        }

    }

    deleteOne(postId: number) {

        if (!postId) {
            return {
                message: "postId missing",
                errorCode: 400
            }
        }

        const postIndex = this.posts.findIndex(post => post.id == postId);

        if (postIndex !== -1) {

            this.posts.splice(postIndex, 1);
            return {
                message: "post deleted"
            }

        } else {
            return {
                message: "post not found",
                errorCode: 404
            }
        }

    }

}
