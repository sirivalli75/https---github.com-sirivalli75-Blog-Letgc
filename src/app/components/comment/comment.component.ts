import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Comment } from '../../models/comment.model';

import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommonModule } from '@angular/common';



@Component({

  selector: 'app-comment',

  templateUrl: './comment.component.html',

  styleUrls: ['./comment.component.scss'],

  imports: [

    CommentFormComponent,

    DatePipe,
    CommonModule

  ]

})

export class CommentComponent {

  @Input() comment!: Comment;

  @Input() postId!: number;

  showReplyForm = false;

  toggleReplyForm(): void {

    this.showReplyForm = !this.showReplyForm;

  }



  addReply(reply: Comment): void {

    this.comment.replies = this.comment.replies || [];

    this.comment.replies.push(reply);

    this.showReplyForm = false;

  }
}
