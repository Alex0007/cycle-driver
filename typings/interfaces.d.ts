import { MemoryStream, Stream } from 'xstream';
export interface ResponseStreamBase<Req> {
    request: Req & {
        category?: string;
    };
}
export interface MakeAsyncDriverOptions<Req, Res> {
    /**
     * Async handler that does side-effects
     */
    handler: (requestOptions: Req) => Promise<Res>;
    /**
     * Should we start handling requests without subscriptions (false) or not (true).
     * Default: false
     */
    lazy?: boolean;
}
export interface AsyncDriverSource<Req, Res> {
    filter(predicate: (request: Req) => boolean): AsyncDriverSource<Req, Res>;
    select(category?: string): Stream<MemoryStream<Res> & ResponseStreamBase<Req>>;
}
