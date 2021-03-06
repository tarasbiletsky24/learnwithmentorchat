import { Component, OnInit } from '@angular/core';
import { Plan } from '../../common/models/plan';
import { Image } from '../../common/models/image';
import { PlanService } from '../../common/services/plan.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpStatusCodeService } from '../../common/services/http-status-code.service';

class PlanInfo {
  plan: Plan;
  imageData: any;
  loading: boolean;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  plans: PlanInfo[] = new Array;

  constructor(private planService: PlanService,
    private httpStatusCodeService: HttpStatusCodeService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.planService.getSomePlans(0, 4).subscribe(
      res => {
        res.forEach(p => {
          let planInfo: PlanInfo;
          planInfo = new PlanInfo;
          planInfo.plan = p;
          planInfo.loading = true;
          this.plans.push(planInfo);
          this.planService.getImage(p.Id).subscribe(
            resp => {
              if (this.httpStatusCodeService.isOk(resp.status)) {
                const extension = resp.body.Name.split('.').pop().toLowerCase();
                const imgUrl = `data:image/${extension};base64,${resp.body.Base64Data}`;
                planInfo.imageData = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
                planInfo.loading = false;
              } else {
                planInfo.imageData = null;
                planInfo.loading = false;
              }
            }
          );
        });
      }
    );
  }

}

