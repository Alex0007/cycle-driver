"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapt_1 = require("@cycle/run/lib/adapt");
class MainAsyncDriverSource {
    constructor(_res$$) {
        this._res$$ = _res$$;
    }
    filter(predicate) {
        const filtered$$ = this._res$$.filter((r$) => predicate(r$.request));
        return new MainAsyncDriverSource(filtered$$);
    }
    select(category) {
        const res$$ = category
            ? this._res$$.filter((res$) => res$.request && res$.request.category === category)
            : this._res$$;
        return adapt_1.adapt(res$$);
    }
}
exports.MainAsyncDriverSource = MainAsyncDriverSource;
