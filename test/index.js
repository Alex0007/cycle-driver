import * as fs from 'fs'
import test from 'ava';
import { run } from '@cycle/run'
import xs from 'xstream'

import flattenConcurrently from 'xstream/extra/flattenConcurrently'

import { makeAsyncDriver } from '../dist/'

test.cb((t) => {
    t.plan(1);
    setTimeout(() => { }, 5000)
    const Main = ({ read }) => {
        const request$ = xs.of({
            path: './test/sample.txt'
        })

        const result$ = read
            .select()
            .compose(flattenConcurrently)
            .debug('driver response')
            .map(({ content }) => { t.deepEqual(content, '1 2 3\n') })
            .map(() => { t.end() })

        return {
            read: xs.merge(request$, xs.combine(xs.never(), result$))
        }
    }

    run(Main, {
        read: makeAsyncDriver({
            handler: (request) => {
                console.log('driver handler called')

                return new Promise((resolve, reject) => {
                    fs.readFile(request.path, (err, data) => {
                        if (err) { return reject(err); }

                        resolve({ content: data.toString() });
                    })
                })
            }
        })
    })
});
