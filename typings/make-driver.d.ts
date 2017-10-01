import { Driver } from '@cycle/run';
import xs from 'xstream';
import { AsyncDriverSource, MakeAsyncDriverOptions } from './interfaces';
export declare function makeAsyncDriver<Req, Res>(options: MakeAsyncDriverOptions<Req, Res>): Driver<xs<Req>, AsyncDriverSource<Req, Res>>;
