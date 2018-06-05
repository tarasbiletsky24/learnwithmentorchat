import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Comment } from '../models/comment';
import { Role } from '../models/role';
=======
import { User } from '../models/user';
>>>>>>> d1f646673d4d5224be90c27abc004f55fbb2d999
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

<<<<<<< HEAD
  private url = `${environment.apiUrl}`;

  getComments(taskId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}task/${taskId}/comment`).pipe(
=======
  private url = `${environment.apiUrl}/task`;

  getComments(taskId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}/${taskId}`).pipe(
>>>>>>> d1f646673d4d5224be90c27abc004f55fbb2d999
      catchError(this.handleError<Comment[]>(`getComments`))
    );
  }

<<<<<<< HEAD
  getComment(id): Observable<Comment> {
    return this.http.get<Comment>(`${this.url}comment/${id}`).pipe(
      catchError(this.handleError<Comment>(`getComment id=${id}`))
    );
  }

  updateComment(comment: Comment): Observable<any> {
    return this.http.put<Comment>(`${this.url}comment/${comment.Id}`, comment, this.httpOptions).pipe(
=======
  updateComment(comment: Comment, taskId: number): Observable<any> {
    return this.http.put<Comment>(`${this.url}/${taskId}/comment`, comment, this.httpOptions).pipe(
>>>>>>> d1f646673d4d5224be90c27abc004f55fbb2d999
      catchError(this.handleError<any>('updateComment'))
    );
  }

  addComment(comment: Comment, taskId: number): Observable<Comment> {
<<<<<<< HEAD
    return this.http.post<Comment>(`${this.url}task/${taskId}/comment`, comment, this.httpOptions).pipe(
=======
    return this.http.post<Comment>(`${this.url}/${taskId}`, comment, this.httpOptions).pipe(
>>>>>>> d1f646673d4d5224be90c27abc004f55fbb2d999
      catchError(this.handleError<Comment>('addComment'))
    );
  }

  deleteCommentById (id: number): Observable<Comment> {  
<<<<<<< HEAD
    return this.http.delete<Comment>(`${this.url}comment/${id}`, this.httpOptions).pipe(
=======
    return this.http.delete<Comment>(`${this.url}/comment/${id}`, this.httpOptions).pipe(
>>>>>>> d1f646673d4d5224be90c27abc004f55fbb2d999
      catchError(this.handleError<Comment>('deleteComment'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
