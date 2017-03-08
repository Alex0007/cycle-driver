"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        const response$ = createResponse$(request, options.handler).remember();
        Object.defineProperty(response$, 'request', {
            value: request,
            writable: false
        });
        if (!options.lazy) {
            response$.addListener({ next: noop });
        }
        return response$;
    };
    const asyncDriver = (driverRequests$) => {
        const response$$ = driverRequests$.map(driverRequestsToResponse$);
        const asyncSource = new AsyncDriverSource_1.MainAsyncDriverSource(response$$);
        response$$.addListener(noop);
        return asyncSource;
    };
    return asyncDriver;
}
exports.makeAsyncDriver = makeAsyncDriver;
;
