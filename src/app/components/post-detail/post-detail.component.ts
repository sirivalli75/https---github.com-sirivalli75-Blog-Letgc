import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Comment } from '../../models/comment.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, CommentFormComponent, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: any = null;
  comments: Comment[] = [];
  editingComment: Comment | null = null;

  constructor(
    private route: ActivatedRoute, 
    private postService: PostService,
    private CommentService: CommentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id).subscribe((data) => {
      console.log('Fetched post:', data); // Log the fetched post data
      this.post = data;
      this.loadComments(id);
    });
  }

  loadComments(postId: number): void {
    this.CommentService.getCommentsByPostId(postId).subscribe({
      next: (data) => {
        console.log('Comments data:', data);
        this.comments = data;
      },
      error: (error) => console.error('Error loading comments:', error)
    });
  }

  addComment(comment: Comment): void {
    this.comments.push(comment);
  }

  editComment(comment: Comment): void {
    this.editingComment = comment;
  }

  cancelEdit(): void {
    this.editingComment = null;
  }

  onCommentSaved(comment: Comment): void {
    this.CommentService.addComment(comment).subscribe({
      next: (savedComment) => {
        if (this.editingComment) {
          const index = this.comments.findIndex(c => c.id === savedComment.id);
          if (index !== -1) {
            this.comments[index] = savedComment;
          }
          this.editingComment = null;
        } else {
          this.comments.push(savedComment);
        }
      },
      error: (error) => console.error('Error saving comment:', error)
    });
  }
}
