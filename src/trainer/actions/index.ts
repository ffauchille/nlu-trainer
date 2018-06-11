import { Action } from "redux";

export type AddUtterance = Action & {
  utterance: string;
};

export type UtteranceAdded = Action & {
  utterance: string;
};

export type LoadUtterances = Action;

export type UtterancesLoaded = Action & {
  utterances: string[];
};



export const AddUtterance: string = "trainer#AddUtterance";
export const UtteranceAdded: string = "trainer#utternaceAdded";
export const LoadUtterances: string = "trainer#loadUtterances";
export const UtterancesLoaded: string = "trainer#utterrancesLoaded";

export const addUtterance = (utterance: string): AddUtterance => ({
  type: AddUtterance,
  utterance
});

export const utteranceAdded = (utterance: string): UtteranceAdded => ({
  type: utteranceAdded,
  utterance
});

export const loadUtterances = (): LoadUtterances => ({ type: LoadUtterances });

export const utterancesLoaded = (utterances: string[]): UtterancesLoaded => ({
  type: UtterancesLoaded,
  utterances
});

export type Actions =
  | AddUtterance
  | UtteranceAdded
  | LoadUtterances
  | UtterancesLoaded;
