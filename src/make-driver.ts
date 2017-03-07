import { Driver } from '@cycle/run';
import { Stream } from 'xstream';
import xs, { MemoryStream } from 'xstream';

import { MainAsyncDriverSource } from './AsyncDriverSource';
import { AsyncDriverSource, MakeAsyncDriverOptions, ResponseStreamBase } from './interfaces';

const noop = (): void => undefined;

function createResponse$<Req, Res>(request: Req, handler: (requestOptions: Req) => Promise<Res>) {
    return xs.create<Res>({
        start: (listener) => {
            handler(request)
                .then((result) => { listener.next(result); })
                .catch((err) => { listener.error(err); });
        },
        stop: noop
    });
}

export function makeAsyncDriver<Req, Res>(options: MakeAsyncDriverOptions<Req, Res>) {
    const driverRequestsToResponse$ = (request: Req): MemoryStream<Res> & ResponseStreamBase<Req> => {
        const response$ = createResponse$<Req, Res>(request, options.handler).remember();

        Object.defineProperty(response$, 'request', {
            value: request,
            writable: false
        });

        if (!options.lazy) {
            response$.addListener({ next: noop });
        }

        return response$ as (MemoryStream<Res> & ResponseStreamBase<Req>);
    };

    const asyncDriver: Driver<Stream<Req>, AsyncDriverSource<Req, Res>> = (driverRequests$) => {
        const response$$ = driverRequests$.map(driverRequestsToResponse$);
        const asyncSource = new MainAsyncDriverSource(response$$);

        response$$.addListener(noop);

        return asyncSource;
    };

    return asyncDriver;
};
