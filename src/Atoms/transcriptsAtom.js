import { atom } from "recoil";

export const transcriptState = atom({
    key: 'transcriptState',
    default: ''
});

export const isListeningState = atom({
    key: 'isListeningState',
    default: false
});