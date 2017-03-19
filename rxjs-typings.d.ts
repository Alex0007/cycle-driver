import { Observable } from 'rxjs';
import { ResponseStreamBase } from './src/interfaces';

export interface AsyncDriverSource<Req, Res> {
    filter<S extends AsyncDriverSource<Req, Res>>(predicate: (request: Req) => boolean): S;
    select(category?: string): Observable<Observable<Res> & ResponseStreamBase<Req>>;
}
