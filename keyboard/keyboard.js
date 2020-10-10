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
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard_keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard_key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

    // _ implies that this is a private message
    _createKeys() {
        // let mount = document.querySelector("keyboard-container");
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        // Cycle thorugh the keys and generate the keyboard.
        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // Add attributes and classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard_key"); //Every key neeeds to have this class.

            // Deal with special case keys!
            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard_key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard_key--wide", "keyboard_key--activatatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard_key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard_key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n"; //append new line to input
                        keyElement.classList.toggle("keyboard_key--active", this.properties.capsLock);
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard_key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " "; //append a space to the input
                        this._triggerEvent("oninput");
                    });

                    break;
                case "done":
                    keyElement.classList.add("keyboard_key--wide", "keyboard-key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;
                
                default: 
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toLowerCase : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });
    
        // mount.appendChild(fragment)

        return fragment;
    },

    _triggerEvent(handlerName) {
        console.log("Event triggered! Event name: " + handlerName);

        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        console.log("Caps Lock Toggled!");
        this.properties.capsLock = !this.properties.capsLock;

        
        for (const key of this.elements.keys) {

            // If we have a standard letter key, toggle the case of the key.
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }

};

window.addEventListener("DOMContentLoaded", function () {
    // let x = document.getElementById("keyboard_container");
    let k = Keyboard.init();
    // x.appendChild(k);
    k.open("dcode", function (currentValue) {
        console.log("Value changed! Here it is: " + currentValue);
    }, function (currentValue) {
        console.log("Keyboard closed! Fnishing value: " + currentValue);
    });
});