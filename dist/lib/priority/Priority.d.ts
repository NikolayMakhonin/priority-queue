export declare class Priority {
    readonly order: number;
    readonly parent: Priority;
    constructor(order: number, parent?: Priority);
    private _branch;
    get branch(): number[];
}
export declare function priorityCreate(order: number | null, parent?: Priority): Priority;
export declare function priorityCompare(o1: Priority, o2: Priority): number;
