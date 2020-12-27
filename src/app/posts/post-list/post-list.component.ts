import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-list', 
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
    // posts = [
    //     { title:"First", content:"This is the first post."},
    //     { title:"Second", content:"This is the Second post."},
    //     { title:"Third", content:"This is the Third post."}
    // ]
    posts : Post[] =[];
    private postsSub =new Subscription;

    constructor( public postsService : PostsService) {}

    ngOnInit(){
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener()
            .subscribe((posts: Post[]) => {
                this.posts = posts;
            });
    }

    onDelete(postId: string){
        this.postsService.deletePost(postId);
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }
}