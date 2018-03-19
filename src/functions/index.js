export const findIndexByValue = (arrObj, val) => {
    var i = null;
    arrObj.forEach((obj, index) => {
        if (Object.values(obj).find(foundId => obj.id === val)) {
            i = index;
        }
    });
    return i;
}

// Random Id Generate
export const seedId = () => {
    return Math.floor((Math.random()) * 0x1000000).toString(16);
}
export const generateId = () => {
    return seedId() + "-" + seedId() + "-" + seedId() + "-" + seedId() + "-" + seedId() + "-" + seedId();
}
