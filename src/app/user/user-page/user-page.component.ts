import { Component, OnInit } from '@angular/core';
import { User } from '../../common/models/user';
import { UserService } from '../../common/services/user.service';
import { Image } from '../../common/models/image';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertWindowsComponent } from '../../components/alert-windows/alert-windows.component';
import { Statistics } from '../../common/models/statistics';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  displayedColumns = ['In Progress'];
  userId: number;
  userData: User;
  userStats = null;
  selectedFile: File = null;
  private maxImageSize: number = 1024 * 1024;
  imageData = null;

  constructor(private userService: UserService,
    private sanitizer: DomSanitizer,
    private alertWindow: AlertWindowsComponent) { }

  ngOnInit() {
    this.userId = +localStorage.getItem('id');
    this.userService.getUser(this.userId).subscribe(
      resp => {
        this.userData = resp;
        this.userService.getImage(this.userId).subscribe(
          response => {
            if (response.status === 200) {
              this.setUserPic(response.body);
            } else {
              this.imageData = '../../../assets/images/user-default.png';
            }
          }
        );
        this.userService.getStatistics(this.userId).subscribe(
          r => {
            if (r.status === 200) {
              this.userStats = r.body;
            }
          }
        );
      }
    );
  }

  onFileSelected(event) {
    const selected: File = event.target.files[0];
    if (selected == null) {
      return null;
    }
    if (selected.size > this.maxImageSize) {
      this.alertWindow.openSnackBar(`Image size must be less then ${this.maxImageSize / (1024 * 1024)} mb, please select another`, 'Ok');
    } else {
      this.selectedFile = selected;
      const preview = document.getElementById('newImage') as HTMLImageElement;
      const reader = new FileReader();
      reader.onloadend = function () {
        preview.src = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  setUserPic(img: Image) {
    const extension = img.Name.split('.').pop().toLowerCase();
    const imgUrl = `data:image/${extension};base64,${img.Base64Data}`;
    this.imageData = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
  }

  onSaveClick() {
    this.userService.updateImage(this.userData.Id, this.selectedFile).subscribe(
      this.selectedFile = null
    );
  }

}
