import { Driver } from '@cycle/run';
import { Stream } from 'xstream';
import { AsyncDriverSource, MakeAsyncDriverOptions } from './interfaces';
export declare function makeAsyncDriver<Req, Res>(options: MakeAsyncDriverOptions<Req, Res>): Driver<Stream<Req>, AsyncDriverSource<Req, Res>>;
