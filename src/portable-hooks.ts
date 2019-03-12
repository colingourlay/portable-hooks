import {
  useCallback as useCallback_React,
  useEffect as useEffect_React,
  useImperativeHandle as useImperativeHandle_React,
  useLayoutEffect as useLayoutEffect_React,
  useMemo as useMemo_React
} from 'react';

type Inputs = any[];
type Ref<T> = { current: T | null } | ((inst: T | null) => any) | null | void;
type EffectCleaner = () => void;
type EffectCreator = (...inputs: Inputs) => EffectCleaner | void;
type MemoCreator = (...inputs: Inputs) => Function;
type ImperativeHandleCreator<T> = (...inputs: Inputs) => T;

export function useCallback(callback: Function, inputs?: Inputs | null): Function {
  return useCallback_React(() => callback.apply(null, inputs), inputs);
}

export function useEffect(create: EffectCreator, inputs?: Inputs | null): void {
  return useEffect_React(() => create && create.apply(null, inputs), inputs);
}

export function useImperativeHandle<T>(ref: Ref<T>, create: ImperativeHandleCreator<T>, inputs?: Inputs | null): void {
  return useImperativeHandle_React(ref, () => create.apply(null, inputs), inputs);
}

export function useLayoutEffect(create: EffectCreator, inputs?: Inputs | null): void {
  return useLayoutEffect_React(() => create && create.apply(null, inputs), inputs);
}

export function useMemo(create: MemoCreator, inputs?: Inputs | null): Function {
  return useMemo_React(() => create.apply(null, inputs), inputs);
}
