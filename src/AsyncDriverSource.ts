import { adapt } from '@cycle/run/lib/adapt';
import { MemoryStream, Stream } from 'xstream';
import { AsyncDriverSource, ResponseStreamBase } from './interfaces';

export class MainAsyncDriverSource<Req, Res> implements AsyncDriverSource<Req, Res> {
    constructor(private _res$$: Stream<MemoryStream<Res> & ResponseStreamBase<Req>>) { }

    public filter(predicate: (request: Req) => boolean): MainAsyncDriverSource<Req, Res> {
        const filtered$$ = this._res$$.filter((r$) => predicate(r$.request));
        return new MainAsyncDriverSource<Req, Res>(filtered$$);
    }

    public select(category?: string) {
        const res$$ = category
            ? this._res$$.filter((res$) => res$.request && res$.request.category === category)
            : this._res$$;

        return adapt(res$$);
    }
}
