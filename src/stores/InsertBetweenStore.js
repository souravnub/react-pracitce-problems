import { atom } from "jotai";
import { editListVal, insertBeforeIdx } from "../utils";

export const listAtom = atom([]);

export const seperatorAtom = atom("");

export const stringAtom = atom((get) => {
    return get(listAtom).join(get(seperatorAtom));
});
export const clearStatesAtom = atom(null, (get, set) => {
    set(listAtom, []);
    set(seperatorAtom, "");
});

export const insertToListAtom = atom(null, (get, set, { idx, val }) => {
    set(listAtom, insertBeforeIdx(get(listAtom), idx, val));
});

export const editListItemAtom = atom(null, (get, set, { idx, val }) => {
    set(listAtom, editListVal(get(listAtom), idx, val));
});
