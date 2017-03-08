import { MemoryStream, Stream } from 'xstream';
import { AsyncDriverSource, ResponseStreamBase } from './interfaces';
export declare class MainAsyncDriverSource<Req, Res> implements AsyncDriverSource<Req, Res> {
    private _res$$;
    constructor(_res$$: Stream<MemoryStream<Res> & ResponseStreamBase<Req>>);
    filter(predicate: (request: Req) => boolean): MainAsyncDriverSource<Req, Res>;
    select(category?: string): any;
}
