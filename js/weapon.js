class Weapon {
    constructor(name, avatar, hidden) {
        this.name = name;
        this.avatar = avatar;
        this.isHidden = hidden !== undefined || hidden;

        this.id = uuid.new();

        this._weaknesses = [];
    }

    addWeakness(weapon) {
        this._weaknesses.push(weapon);
    }

    isWeak(value) {
        return this._weaknesses.any(_ => _.id === value.id);
    }
}