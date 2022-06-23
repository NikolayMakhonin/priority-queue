class Priority {
    constructor(order, parent) {
        this._branch = null;
        this.order = order;
        this.parent = parent;
    }
    get branch() {
        if (!this._branch) {
            const branch = [this.order];
            let parent = this.parent;
            while (parent != null) {
                branch.push(parent.order);
                parent = parent.parent;
            }
            this._branch = branch;
        }
        return this._branch;
    }
}
function priorityCreate(order, parent) {
    if (order == null) {
        if (parent == null) {
            return null;
        }
        return parent;
    }
    return new Priority(order, parent);
}
function priorityCompare(o1, o2) {
    const b1 = o1 && o1.branch;
    const b2 = o2 && o2.branch;
    const len1 = b1 ? b1.length : 0;
    const len2 = b2 ? b2.length : 0;
    const len = len1 > len2 ? len1 : len2;
    for (let i = 0; i < len; i++) {
        const order1 = i >= len1 ? 0 : b1[len1 - 1 - i];
        const order2 = i >= len2 ? 0 : b2[len2 - 1 - i];
        if (order1 !== order2) {
            return order1 > order2 ? 1 : -1;
        }
    }
    return 0;
}

export { Priority, priorityCompare, priorityCreate };
