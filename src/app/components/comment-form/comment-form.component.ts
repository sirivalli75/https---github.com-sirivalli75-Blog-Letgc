// src/app/components/comment-form/comment-form.component.ts
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../../models/comment.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  standalone: true
})
export class CommentFormComponent implements OnInit {
  @Input() parentId: number | null = null;
  @Input() postId!: number;
  @Input() existingComment: Comment | null = null;
  @Output() commentAdded = new EventEmitter<Comment>();

  commentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      user: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    if (this.existingComment) {
      this.commentForm.patchValue({
        user: this.existingComment.user,
        content: this.existingComment.content
      });
    }
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const comment: Comment = {
        id: this.existingComment?.id || Date.now(),
        postId: this.postId,
        parentId: this.parentId,
        user: this.commentForm.value.user,
        date: this.existingComment?.date || new Date().toISOString(),
        content: this.commentForm.value.content,
        replies: this.existingComment?.replies || [],
      };
      this.commentAdded.emit(comment);
      if (!this.existingComment) {
        this.commentForm.reset();
      }
    }
  }
}
