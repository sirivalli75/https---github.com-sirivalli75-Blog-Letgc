// src/app/services/post.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService, Post } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:9000/posts';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should retrieve all posts', () => {
    const dummyPosts: Post[] = [
      {
        id: 1,
        title: 'Post 1',
        author: 'Author 1',
        publish_date: '2025-02-16',
        slug: 'post-1',
        description: 'Description 1',
        content: 'Content 1',
      },
      {
        id: 2,
        title: 'Post 2',
        author: 'Author 2',
        publish_date: '2025-02-17',
        slug: 'post-2',
        description: 'Description 2',
        content: 'Content 2',
      },
    ];

    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('should retrieve a post by ID', () => {
    const dummyPost: Post = {
      id: 1,
      title: 'Post 1',
      author: 'Author 1',
      publish_date: '2025-02-16',
      slug: 'post-1',
      description: 'Description 1',
      content: 'Content 1',
    };

    service.getPost(1).subscribe((post) => {
      expect(post).toEqual(dummyPost);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPost);
  });
});
