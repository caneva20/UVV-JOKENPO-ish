class Player {
    constructor(character, $portrait, $selectedWeapon) {
        this._$portrait = $portrait;
        this._$selectedWeapon = $selectedWeapon;

        if (character !== undefined) {
            this.character = character;
        }

        this.wins = 0;
        this.selectedWeapon = new Weapon("?????", "");
    }

    set name(value) {
        this._name = value;

        this._$portrait.find(".warrior-name").html(value);
    }

    get name() {
        return this._name;
    }

    set avatar(value) {
        this._avatar = value;

        this._$portrait.find(".warrior-avatar").attr("src", value);
    }

    get avatar() {
        return this._avatar;
    }

    set character(value) {
        this._character = value;

        this.name = this._character.name;
        this.avatar = this._character.img;
    }

    get character() {
        return this._character;
    }

    set wins(value) {
        this._wins = value;

        this._$portrait.find(".wins").html(`${value} Wins`);
    }

    get wins() {
        return this._wins;
    }

    set selectedWeapon(value) {
        this._selectedWeapon = value;

        let avatar = this._$selectedWeapon.find(".weapon-avatar");
        let name = this._$selectedWeapon.find(".weapon-name");

        avatar.hide("fast");
        name.hide();

        setTimeout(() => {
            avatar.attr("src", this._selectedWeapon.avatar);
            name.html(this._selectedWeapon.name);

            avatar.show("fast");
            name.show();
        }, 100);
    }

    get selectedWeapon() {
        return this._selectedWeapon;
    }
}