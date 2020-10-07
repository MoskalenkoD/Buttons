'use strict';

import DrawFigure from './drawFigures.js';
import {Square} from './drawSquare.js';

export class Triangle extends Square {
    constructor(arg) {
        super();
        this.nameFigure = 'triangle';
        if (arg) {
            Object.assign(this, arg);
        }

    }

    draw(parentId) {
        this.parentId = parentId;

        DrawFigure.Triangle(this);
    }
}