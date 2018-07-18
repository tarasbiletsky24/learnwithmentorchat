import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../common/services/user.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpStatusCodeService } from '../common/services/http-status-code.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private statusCodeService: HttpStatusCodeService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }

        if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone ({
                headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('userToken')}`)
            });

            return next.handle(clonedreq)
                .pipe(tap(
                    succ => { },
                    err => {
                        if (this.statusCodeService.isUnauthoized(err.status)) {
                            this.router.navigateByUrl('/');
                        }
                    }
                ));
        }
        this.router.navigateByUrl('/');
    }
}
