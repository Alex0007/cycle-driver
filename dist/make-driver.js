"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapt_1 = require("@cycle/run/lib/adapt");
const xstream_1 = require("xstream");
const AsyncDriverSource_1 = require("./AsyncDriverSource");
const noop = () => undefined;
function createResponse$(request, handler) {
    return xstream_1.default.create({
        start: (listener) => {
            handler(request)
                .then((result) => { listener.next(result); })
                .catch((err) => { listener.error(err); });
        },
        stop: noop
    });
}
function makeAsyncDriver(options) {
    const driverRequestsToResponse$ = (request) => {
        let response$ = createResponse$(request, options.handler).remember();
        if (!options.lazy) {
            response$.addListener({ next: noop });
        }
        response$ = adapt_1.adapt(response$);
        Object.defineProperty(response$, 'request', {
            value: request,
            writable: false
        });
        return response$;
    };
    const asyncDriver = (driverRequests$) => {
        const response$$ = driverRequests$.map(driverRequestsToResponse$);
        const asyncSource = new AsyncDriverSource_1.MainAsyncDriverSource(response$$);
        response$$.addListener({ next: noop });
        return asyncSource;
    };
    return asyncDriver;
}
exports.makeAsyncDriver = makeAsyncDriver;
;
