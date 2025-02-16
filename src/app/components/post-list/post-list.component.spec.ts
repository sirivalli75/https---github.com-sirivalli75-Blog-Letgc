import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostListComponent } from './post-list.component';
import { PostService } from '../../services/post.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    // Create a mock PostService with a spy on the getPosts method
    mockPostService = jasmine.createSpyObj('PostService', ['getPosts']);

    // Mock data to be returned by the getPosts method
    const mockPosts = [
      { id: 1, title: 'Test Post 1', content: 'Content 1' },
      { id: 2, title: 'Test Post 2', content: 'Content 2' },
    ];

    // Configure the spy to return the mock data
    mockPostService.getPosts.and.returnValue(of(mockPosts as Post[]));

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, PostListComponent],
      providers: [{ provide: PostService, useValue: mockPostService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit and data binding
  });

  it('should fetch and display a list of posts', () => {
    // Verify that the getPosts method was called
    expect(mockPostService.getPosts).toHaveBeenCalled();

    // Verify that the component's posts property was populated correctly
    expect(component.posts.length).toBe(2);
    expect(component.posts[0].title).toBe('Test Post 1');
    expect(component.posts[1].title).toBe('Test Post 2');

    // Optionally, verify the rendered HTML
    const compiled = fixture.nativeElement as HTMLElement;
    const postElements = compiled.querySelectorAll('li');
    expect(postElements.length).toBe(2);
    expect(postElements[0].textContent).toContain('Test Post 1');
    expect(postElements[1].textContent).toContain('Test Post 2');
  });
});
