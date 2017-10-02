import { Observable } from 'rxjs';
import { ResponseStreamBase } from './src/interfaces';

export interface AsyncDriverSource<Req, Res> {
    filter(predicate: (request: Req) => boolean): AsyncDriverSource<Req, Res>;
    select(category?: string): Observable<Observable<Res> & ResponseStreamBase<Req>>;
}
