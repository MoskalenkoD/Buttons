'use strict';

import DrawFigure from './drawFigures.js';
import {GeometricFigure} from './classesOfFigures.js';

export class Circle extends GeometricFigure {
    constructor(arg) {
        super();
        this.nameFigure = 'circle';
        if (arg) {
            Object.assign(this, arg);
        } else {
            this.color = '';
            this.speed = null;
            this.radius = null;
        }
    }

    draw(parentId) {
        this.parentId = parentId;

        DrawFigure.Circle(this);
    }
}