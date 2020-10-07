'use strict';

import OPTIONS_BUTTONS from './constant.js';
import EditHtml from './editHTML.js';
import {Square} from './drawSquare.js';
import {Rectangle} from './drawRectangle.js';
import {Triangle} from './drawTriangle.js';
import {Circle} from './drawCircle.js';

let ListEvents = {
    addBlocksEvent: (event) => {

        let selectForButtonRemove = `.button-${OPTIONS_BUTTONS.OptionsButtonRemove.title.toLowerCase()}`;

        if (!document.querySelector(selectForButtonRemove)) {
            event.target.parentElement.appendChild(EditHtml.createButton(OPTIONS_BUTTONS.OptionsButtonRemove));
        }

        EditHtml.creatingBlockForFigure(event.target.parentElement);

    },

    removeBlocksEvent: (event) => {

        let isDelete = deleteСоnfirmation();

        if (isDelete) {
            let listCheckbox = document.querySelectorAll(".block-for-figures > input[type='checkbox']");

            for (let i = 0; i < listCheckbox.length; i++) {
                if (listCheckbox[i].checked) {
                    listCheckbox[i].parentNode.remove();
                }
            }

            event.target.disabled = true;
        }
    },

    targetDisabledButtonRemoveEvent: (event) => {

        let listCheckbox = document.querySelectorAll(".block-for-figures > input[type='checkbox']");

        let isChecked = [].some.call(listCheckbox, (checkbox) => checkbox.checked);

        document.querySelector('.button-remove').disabled = !isChecked;
    },

    addFigureEvent: (event) => {

        let uniqueParentID = event.target.parentNode.id;
        document.querySelector('form').className = uniqueParentID;
        document.querySelector('.form-for-new-figure').style.display = 'block';
        document.querySelector('.shadow-for-form').style.display = 'block';

    },

    removeFigureEvent: function (event) {
        let isDelete = deleteСоnfirmation();

        if (isDelete) {
            let listCheckbox = document.querySelectorAll("input[type='checkbox']");

            for (let i = 0; i < listCheckbox.length; i++) {
                if (listCheckbox[i].checked) {
                    listCheckbox[i].parentNode.remove();
                }
            }

            event.target.disabled = true;
        }
    },

    checkedFigureEvent: function (event) {

        let node = event.target;

        while (!node.classList.length || !node.classList.contains('block-for-figures')) {
            node = node.parentNode;
        }

        let listCheckbox = document.querySelectorAll(`#${node.id} .content-block-for-figures input[type='checkbox']`);

        let isChecked = [].some.call(listCheckbox, (checkbox) => checkbox.checked);

        document.querySelector(`#${node.id}  .button-remove`).disabled = !isChecked;
    },

    changeSelectEvent: (event) => {
        document.querySelector('#picker').style.display = 'block';
        document.querySelector('#slide').style.display = 'block';

        switch (event.target.value) {
            case 'square': {
                EditHtml.addInputForForm(new Square());
                break;
            }
            case 'rectangle': {
                EditHtml.addInputForForm(new Rectangle());
                break;
            }
            case 'triangle': {
                EditHtml.addInputForForm(new Triangle());
                break;

            }
            case 'circle': {
                EditHtml.addInputForForm(new Circle());
                break
            }
        }
    },

    submitForm: (event) => {
        let listInputs = document.querySelectorAll('.form-for-new-figure input');
        if (validate(listInputs)) {

            let optionButtonRemoveFigure = OPTIONS_BUTTONS.OptionsButtonRemove;
            let parentBlockID = document.querySelector('.form-for-new-figure form').className;

            if (!document.querySelector(`#${parentBlockID} .button-remove`)) {

                optionButtonRemoveFigure.parentBlockID = parentBlockID;
                optionButtonRemoveFigure.styles.display = 'inline';
                optionButtonRemoveFigure.styles.width = '75px';
                optionButtonRemoveFigure.callback = ListEvents.removeFigureEvent;
                document.querySelector('#' + parentBlockID).appendChild(EditHtml.createButton(optionButtonRemoveFigure));
            }

            let properties = {};
            listInputs.forEach(function (input) {
                properties[input.className] = input.value;
            });

            let nameFigure = document.querySelector('.form-for-new-figure select').value;
            let parentId = document.querySelector('.form-for-new-figure form').className;

            switch (nameFigure) {
                case 'square': {
                    let square = new Square(properties);
                    square.draw(parentId);
                    square.writeInLocalStorage();
                    break;
                }
                case 'rectangle': {
                    let rectangle = new Rectangle(properties);
                    rectangle.draw(parentId);
                    rectangle.writeInLocalStorage();
                    break;
                }
                case 'triangle': {
                    let triangle = new Triangle(properties);
                    triangle.draw(parentId);
                    triangle.writeInLocalStorage();
                    break;

                }
                case 'circle': {
                    let circle = new Circle(properties);
                    circle.draw(parentId);
                    circle.writeInLocalStorage();
                    break
                }
            }

            EditHtml.closeModal();
            document.querySelector('.form-for-new-figure form p.error').style.display = 'none';

        } else {
            document.querySelector('.form-for-new-figure form p.error').style.display = 'block';
        }
    },

    animationFigure: (event) => {

        if (event.target.tagName == "CANVAS") {
            let figure = event.target.parentNode;
            let speed = parseInt(figure.className.substring(7));
            let deltaHeight = figure.parentNode.offsetHeight - figure.offsetHeight;
            let top = 0;

            let timeInterval = Math.floor(1 / speed * 1000);

            let timer = setInterval(() => {

                if (top >= deltaHeight) {
                    clearInterval(timer);
                    timer = setInterval(() => {

                        if (top <= 0) {
                            clearInterval(timer);
                            return;
                        }

                        top -= 2;
                        figure.style.top = `${top}px`;

                    }, timeInterval);
                    return;
                }

                top += 2;
                figure.style.top = `${top}px`;

            }, timeInterval);
        }
    }
};

const validate = (listProperty) => {
    return [].every.call(listProperty, function (inputNode) {

        switch (inputNode.className) {
            case 'color': {

                let color = inputNode.value.match(/#[a-f0-9]{6}\b/gi);
                return !!color;
            }
            case 'height':
            case 'speed':
            case 'radius':
            case 'width': {
                return !isNaN(parseFloat(inputNode.value)) && isFinite(inputNode.value);
            }
        }
    });
};

const deleteСоnfirmation = () => {
    return confirm("Are you sure you want to delete?");
};

export default ListEvents;