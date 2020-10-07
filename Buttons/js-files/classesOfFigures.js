'use strict';

export class GeometricFigure {
    constructor() {
        this.nameFigure = '';
    }

    writeInLocalStorage() {

        let memoryForBlocks = JSON.parse(window.localStorage.getItem('memoryForBlocks'));
        if (!memoryForBlocks) memoryForBlocks = {};

        if (memoryForBlocks[this.parentId] && memoryForBlocks[this.parentId].length) {
            memoryForBlocks[this.parentId].push(this);
        } else {
            let newBlock = [];
            newBlock.push(this);
            memoryForBlocks[this.parentId] = newBlock;
        }

        window.localStorage.setItem('memoryForBlocks', JSON.stringify(memoryForBlocks));
    }
}