import { Bodies, Body } from "matter-js";

export default class Rectangle {
    private _width: number;
    private _height: number;
    private _rectBody: Body;

    constructor(x: number, y: number, w: number, h: number, options: any = {}) {
        this._width = w;
        this._height = h;
        this._rectBody = Bodies.rectangle(x, y, w, h, options);
    }

    public get width() {
        return this._width;
    }

    public get height() {
        return this._height;
    }

    public get rectBody() {
        return this._rectBody;
    }
}
