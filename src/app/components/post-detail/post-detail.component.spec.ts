// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { of } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { CommonModule } from '@angular/common';
// import { PostDetailComponent } from './post-detail.component';
// import { PostService } from '../../services/post.service';
// import { CommentService } from '../../services/comment.service';
// import { CommentFormComponent } from '../comment-form/comment-form.component';

// describe('PostDetailComponent', () => {
//   let component: PostDetailComponent;
//   let fixture: ComponentFixture<PostDetailComponent>;
//   let mockPostService: jasmine.SpyObj<PostService>;
//   let mockCommentService: jasmine.SpyObj<CommentService>;

//   beforeEach(async () => {
//     // Create mock services
//     mockPostService = jasmine.createSpyObj('PostService', ['getPost']);
//     mockCommentService = jasmine.createSpyObj('CommentService', ['getCommentsByPostId']);

//     await TestBed.configureTestingModule({
//       imports: [
//         CommonModule,
//         HttpClientTestingModule,
//         RouterTestingModule,
//         CommentFormComponent
//       ],
//       providers: [
//         { provide: PostService, useValue: mockPostService },
//         { provide: CommentService, useValue: mockCommentService },
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             snapshot: { paramMap: { get: () => '1' } }
//           }
//         }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(PostDetailComponent);
//     component = fixture.componentInstance;
//   });

//   it('should fetch and display post details', () => {
//     const mockPost = {
//       id: 1,
//       title: 'Test Post',
//       content: '<p>Test Content</p>'
//     };

//     mockPostService.getPost.and.returnValue(of(mockPost));
//     mockCommentService.getCommentsByPostId.and.returnValue(of([]));

//     fixture.detectChanges();

//     expect(component.post).toEqual(mockPost);
//     expect(mockPostService.getPost).toHaveBeenCalledWith(1);
//   });
// });
