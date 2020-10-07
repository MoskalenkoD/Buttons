'use strict';

import DrawFigure from './drawFigures.js';
import {GeometricFigure} from './classesOfFigures.js';

export class Square extends GeometricFigure {
    constructor(arg) {
        super();
        this.nameFigure = 'square';
        if (arg) {
            Object.assign(this, arg);
        } else {
            this.color = '';
            this.speed = null;
            this.width = null;
        }
    }

    draw(parentId) {
        this.parentId = parentId;

        DrawFigure.Square(this);
    }

}