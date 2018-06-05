import { Component, OnInit } from '@angular/core';
import { Comment } from '../../common/models/comment';
import { CommentService } from '../../common/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments: Comment[];

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.commentService.getComments(0).subscribe(
      u => this.comments = u
    )
  }
}
