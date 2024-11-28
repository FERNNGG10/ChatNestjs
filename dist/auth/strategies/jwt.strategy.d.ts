import { Strategy } from "passport-jwt";
declare const JwtEstrategy_base: new (...args: any[]) => Strategy;
export declare class JwtEstrategy extends JwtEstrategy_base {
    constructor();
    validate(payload: any): any;
}
export {};
