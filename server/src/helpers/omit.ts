/* eslint-disable no-param-reassign */
import produce from 'immer';

function omit<T>(obj: T, property: keyof T | (keyof T)[]) {
    if (Array.isArray(property)) {
        return produce(obj, (draft: T) => {
            property.forEach((key) => {
                delete draft[key];
            });
        });
    }
    return produce(obj, (draft: T) => {
        delete draft[property];
    });
}

export default omit;
