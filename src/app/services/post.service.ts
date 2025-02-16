// src/app/services/post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  author: string;
  publish_date: string;
  slug: string;
  description: string;
  content: string;
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  publish_date: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:9000/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  // src/app/services/post.service.ts
getPost(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}


}
