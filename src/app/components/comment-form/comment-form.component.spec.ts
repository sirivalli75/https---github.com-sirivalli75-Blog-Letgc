import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentFormComponent } from './comment-form.component';
import { Comment } from '../../models/comment.model';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    component.ngOnInit();
    expect(component.commentForm).toBeDefined();
    expect(component.commentForm.get('user')?.value).toBe('');
    expect(component.commentForm.get('content')?.value).toBe('');
  });

  it('should populate the form when existingComment is provided', () => {
    const existingComment: Comment = {
      id: 1,
      postId: 1,
      parentId: null,
      user: 'Existing User',
      date: '2025-02-16T00:00:00Z',
      content: 'Existing comment content.',
      replies: [],
    };

    component.existingComment = existingComment;
    component.ngOnInit();
    expect(component.commentForm.get('user')?.value).toBe('Existing User');
    expect(component.commentForm.get('content')?.value).toBe('Existing comment content.');
  });

  it('should emit commentAdded event with form data on valid form submission', () => {
    spyOn(component.commentAdded, 'emit');

    component.postId = 1;
    component.commentForm.setValue({
      user: 'Test User',
      content: 'This is a test comment.',
    });

    component.onSubmit();

    expect(component.commentAdded.emit).toHaveBeenCalledWith(jasmine.objectContaining({
      user: 'Test User',
      content: 'This is a test comment.',
      postId: 1,
    }));
  });

  it('should not emit commentAdded event on invalid form submission', () => {
    spyOn(component.commentAdded, 'emit');

    component.postId = 1;
    component.commentForm.setValue({
      user: '',
      content: '',
    });

    component.onSubmit();

    expect(component.commentAdded.emit).not.toHaveBeenCalled();
  });
});
