import { atom } from "recoil";

export const promptsState = atom({
    key: 'promptsState',
    default: [],
});

export const responsesState = atom({
    key: 'responsesState',
    default: [],
});