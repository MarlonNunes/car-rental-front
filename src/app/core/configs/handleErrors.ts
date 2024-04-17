import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";

export const handleError = (errorResponse: HttpErrorResponse): Observable<never> => {
    const toastr = inject(ToastrService);
    
    const error = errorResponse.error;
    if (error && error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err: string | undefined) => toastr.error(err));
    } else {
        toastr.error('Ocorreu um erro desconhecido.');
    }

    return throwError(errorResponse);
}
