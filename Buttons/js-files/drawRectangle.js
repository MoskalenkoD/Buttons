'use strict';

import DrawFigure from './drawFigures.js';
import {Square} from './drawSquare.js';

export class Rectangle extends Square {
    constructor(arg) {
        super();
        this.nameFigure = 'rectangle';
        if (arg) {
            Object.assign(this, arg);
        } else {
            this.height = null;
        }
    }

    draw(parentId) {
        this.parentId = parentId;

        DrawFigure.Rectangle(this);
    }
}