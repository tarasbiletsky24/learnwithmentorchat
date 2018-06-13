import {Component, OnInit, ViewChild} from '@angular/core';
import { User } from '../../../common/models/user';
import { Role } from '../../../common/models/role';
import { UserService } from '../../../common/services/user.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Observable, Subject, of } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  roles: Role[];
  users: User[];
  updateUsers:User[];
  delete:number;
  roleName:string=null;
  isMarked:boolean=false;

  getType(roleName:string):string {
  return this.roleName=roleName;
  }

  Choose(id:number):number{
  this.delete=id;  
  console.log(this.delete);
  
  return this.delete;


  }

  displayedColumns = ['Check', 'FirstName', 'LastName', 'Role','Blocked'];
  dataSource = new MatTableDataSource<User>(this.users);

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private searchTerms = new Subject<string>();
  constructor(private userService: UserService) {

   }
     
  search(term: string, roleName:string):void {    
    this.searchTerms.next(term);       
  }
  changeRole(id:number):void{
    return console.log(id);
    
  }
  update(user:User):void{
    this.userService.updateUser(user);
  }
 blockUser(id:number){ 
       
    this.userService.blockUserById(4).subscribe();
    
    
  }

  ngOnInit() {
    
    this.dataSource.paginator = this.paginator;
    

    this.userService.getRoles().subscribe(
      r => this.roles = r
    );
    this.userService.getUsers().subscribe(
      u => this.users = u
    )
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string) => this.userService.search(term,this.roleName))
    ).subscribe(u => this.users = u);
  }
}
