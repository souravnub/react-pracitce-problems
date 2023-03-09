export const insertBeforeIdx = (arr, idx, val) => {
    const currentArr = [...arr];
    currentArr.splice(idx, 0, val);
    return currentArr;
};
export const editListVal = (arr, idx, val) => {
    return arr.map((item, itemIdx) => {
        if (idx === itemIdx) {
            return val;
        }
        return item;
    });
};
