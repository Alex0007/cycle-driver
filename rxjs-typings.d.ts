import { Observable } from 'rxjs'

export interface AsyncDriverSource<Req, Res> {
    filter<S extends AsyncDriverSource<Req, Res>>(predicate: (request: Req) => boolean): S;
    select(category?: string): Observable<Res>;
}
