class ArrayLib {
    constructor(registerToPrototype) {
        if (registerToPrototype) {
            this.registerPrototype();
        }
    }

    registerPrototype() {
        Array.prototype.any = function (predicate) {
            return arraylib.any(this, predicate);
        };

        Array.prototype.select = function (predicate) {
            return arraylib.select(this, predicate);
        };
    }

    any(arr, predicate) {
        for (let el of arr) {
            if (predicate(el)) {
                return true;
            }
        }

        return false;
    }

    select(arr, predicate) {
        let selection = [];

        for (let el of arr) {
            selection.push(predicate(el));
        }

        return selection;
    }
}

const arraylib = new ArrayLib(true);