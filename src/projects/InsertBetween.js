import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { BsPlusLg } from "react-icons/bs";
import {
    clearStatesAtom,
    editListItemAtom,
    insertToListAtom,
    listAtom,
    seperatorAtom,
    stringAtom,
} from "../stores/InsertBetweenStore";

const InsertBetween = () => {
    const listVal = useAtomValue(listAtom);
    const [seperator, setSeperator] = useAtom(seperatorAtom);
    const string = useAtomValue(stringAtom);
    const addVal = useSetAtom(insertToListAtom);
    const editVal = useSetAtom(editListItemAtom);
    const clearStates = useSetAtom(clearStatesAtom);

    const handleEditItemSubmit = (e, { itemIdx }) => {
        e.preventDefault();
        const inputVal = e.target.querySelector(":scope > input").value;
        editVal({ idx: itemIdx, val: inputVal });
    };
    const handleInputBlur = (e, { itemIdx }) => {
        editVal({ idx: itemIdx, val: e.target.value });
    };

    return (
        <div>
            <div className="flex justify-between py-5 px-2 bg-blue-100 gap-5">
                <div className="flex gap-1">
                    <label for="sep">seperator</label>
                    <input
                        className="bg-gray-100 border-2"
                        value={seperator}
                        onChange={(e) => setSeperator(e.target.value)}
                        id="sep"
                        type="text"
                    />
                </div>
                <p className="bg-gray-50 px-2 py-1 flex-1">{string}</p>
                <div className="flex gap-4">
                    <button
                        className="px-4 rounded-sm text-sm font-medium py-1 bg-slate-400"
                        onClick={() => {
                            navigator.clipboard.writeText(string);
                        }}>
                        COPY
                    </button>
                    <button
                        className="px-4 rounded-sm text-sm font-medium py-1 bg-slate-400"
                        onClick={clearStates}>
                        DELETE
                    </button>
                </div>
            </div>
            <div className="mt-10">
                <div className="flex gap-1 justify-center flex-wrap">
                    <button
                        onClick={() => addVal({ idx: 0, val: "" })}
                        className="z-10 px-1 aspect-square rounded-full text-sm self-center bg-gray-100">
                        <BsPlusLg />
                    </button>
                    {listVal.map((item, idx) => (
                        <div className="flex gap-1">
                            <form
                                onSubmit={(e) =>
                                    handleEditItemSubmit(e, { itemIdx: idx })
                                }
                                key={item}
                                className="isolate bg-blue-400 px-5 py-2 flex items-center justify-center font-bold">
                                <input
                                    onBlur={(e) => {
                                        handleInputBlur(e, {
                                            itemIdx: idx,
                                        });
                                    }}
                                    type="text"
                                    defaultValue={item}
                                    className="w-10 text-center"
                                />
                            </form>
                            <button
                                onClick={() =>
                                    addVal({ idx: idx + 1, val: "" })
                                }
                                className="z-10 px-1 aspect-square rounded-full text-sm self-center bg-gray-100">
                                <BsPlusLg />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InsertBetween;
