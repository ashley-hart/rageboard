const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    // Runs when page loads up. 
    init() {
        // const containerDiv = document.getElementById("kb-container");

        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // console.log("Appending kb to: ");
        // containerDiv.appendChild(this.elements.keysContainer);  

        // Setup main elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard_keys");
        // this.elements.keysContainer.classList.add("kb-container");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard_key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

    // _ implies that this is a private message
    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[","]", "\\",
            "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
            "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
            "Alt", " ", "Control"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        // Cycle thorugh the keys and generate the keyboard.
        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = [ "Backspace", "\\", "Enter", "/"].indexOf(key) !== -1;

            // Attempt to assign an id to every key on the board
            keyElement.id = (key);

            // Add attributes and classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard_key"); //Every key neeeds to have this class.

            // Deal with special case keys!
            switch (key) {
                case "Backspace":
                    keyElement.classList.add("keyboard_key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "CapsLock":
                    keyElement.classList.add("keyboard_key--wide", "keyboard_key--activatatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    break;

                case "Enter":
                    keyElement.classList.add("keyboard_key--wide");
                    keyElement.innerHTML = "ENTER";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n"; //append new line to input
                        // this._triggerEvent("oninput");
                    });

                    break;
                case "Shift":
                    keyElement.classList.add("keyboard_key--wide");
                    keyElement.innerHTML = "SHIFT";

                    break;
                case "Alt":
                    keyElement.classList.add("keyboard_key--wide");
                    keyElement.innerHTML = "ALT";
                    break;
                case "Control":
                    keyElement.classList.add("keyboard_key--wide");
                    keyElement.innerHTML = "CTRL";

                    break;
                case "Tab":
                    keyElement.classList.add("keyboard_key--wide");
                    keyElement.innerHTML = "TAB";

                    break;
                case " ":
                    keyElement.classList.add("keyboard_key--extra-wide");
                    keyElement.innerHTML = "SPACE";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " "; //append a space to the input
                        // this._triggerEvent("oninput");
                    });

                    break;
                case "Done":
                    keyElement.classList.add("keyboard_key--wide", "keyboard-key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        // this._triggerEvent("onclose");
                    });

                    break;
                
                default: 
                    keyElement.textContent = key.toUpperCase();

                    keyElement.addEventListener("click", () => {
                        // this.properties.value += this.properties.capsLock ? key.toLowerCase : key.toLowerCase();
                        this.properties.value += key.toUpperCase();
                        // this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        console.log("Event triggered! Event name: " + handlerName);
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    updateValue(key) {
         // Deal with special case keys!
         switch (key) {
            case "Backspace":
                    this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                break;

            case "Enter":
                    this.properties.value += "\n"; //append new line to input
                break;
            case " ":
                    this.properties.value += " "; //append a space to the input
                break;
            default: 
                    this.properties.value += key.toUpperCase();
                break;
        }
    },

    animateKey(key) {
        // Given a keycode, do work to find the button that represents that key
        // Update class list to update CSS.
        key.classList.add("keyboard_pressed");

        console.log("animateKey! Recieved key: " + key);
        console.log("Classes: " + key.classList);
    },

    deanimateKey(key) {
        // Given a keycode, do work to find the button that represents that key
        // Update class list to update CSS.
        key.classList.remove("keyboard_pressed");

        console.log("deanimateKey! Recieved key: " + key);
        console.log("Classes: " + key.classList);
    },
};

// Load keyboard
window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});

window.addEventListener('keydown', function(e) {
    console.log("Keydown event triggered! Key pressed: *" + e.key + "*");
    const pressed_key = document.querySelector(`button[id = "${e.key}"]`);
    console.log(pressed_key);  

    if(!pressed_key) {
        console.log("Invalid key detected!"); 
        return;
    }

    Keyboard.animateKey(pressed_key);
    Keyboard.updateValue(e.key);

    const keys  = document.querySelectorAll('.keyboard_key');
})

// let kb = new Keyboard();
// document.getElementById("kb").innerHTML = kb;

window.addEventListener('keyup', function(e) {
    console.log("Keyup event triggered! Key pressed: *" + e.key + "*");
    const pressed_key = document.querySelector(`button[id = "${e.key}"]`);
    console.log(pressed_key);  

    if(!pressed_key) {
        console.log("Invalid key detected!"); 
        return;
    }

    Keyboard.deanimateKey(pressed_key);
})