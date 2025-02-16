// src/app/services/comment.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentService } from './comment.service';
import { Comment } from '../models/comment.model';

describe('CommentService', () => {
  let service: CommentService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:9000/comments';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService],
    });
    service = TestBed.inject(CommentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should retrieve comments by postId', () => {
    const dummyComments: Comment[] = [
      { id: 1, postId: 1, parentId: null, user: 'Alice', date: '2025-02-16', content: 'Great post!', replies: [] },
      { id: 2, postId: 1, parentId: 1, user: 'Bob', date: '2025-02-16', content: 'Thanks, Alice!', replies: [] },
    ];

    service.getCommentsByPostId(1).subscribe((comments) => {
      expect(comments.length).toBe(2);
      expect(comments).toEqual(dummyComments);
    });

    const req = httpMock.expectOne(`${apiUrl}?postId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyComments);
  });

  it('should add a new comment', () => {
    const newComment: Comment = { id: 3, postId: 1, parentId: null, user: 'Charlie', date: '2025-02-16', content: 'Interesting read.', replies: [] };

    service.addComment(newComment).subscribe((comment) => {
      expect(comment).toEqual(newComment);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newComment);
    req.flush(newComment);
  });

  it('should update an existing comment', () => {
    const updatedComment: Comment = { id: 1, postId: 1, parentId: null, user: 'Alice', date: '2025-02-16', content: 'Updated comment.', replies: [] };

    service.updateComment(updatedComment).subscribe((comment) => {
      expect(comment).toEqual(updatedComment);
    });

    const req = httpMock.expectOne(`${apiUrl}/${updatedComment.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedComment);
    req.flush(updatedComment);
  });
});
