import {
  useCallback as useCallback_React,
  useEffect as useEffect_React,
  useImperativeHandle as useImperativeHandle_React,
  useLayoutEffect as useLayoutEffect_React,
  useMemo as useMemo_React
} from 'react';

type Deps = any[];
type Inputs = any[];
type Ref<T> = { current: T | null } | ((inst: T | null) => any) | null | void;
type EffectCleaner = () => void;
type EffectCreator = (...inputs: Inputs) => EffectCleaner | void;
type MemoCreator = (...inputs: Inputs) => Function;
type ImperativeHandleCreator<T> = (...inputs: Inputs) => T;

export function useCallback(callback: Function, inputs?: Inputs | null, deps?: Deps): Function {
  return useCallback_React(() => callback.apply(null, inputs), deps || inputs);
}

export function useEffect(create: EffectCreator, inputs?: Inputs | null, deps?: Deps): void {
  return useEffect_React(() => create && create.apply(null, inputs), deps || inputs);
}

export function useImperativeHandle<T>(
  ref: Ref<T>,
  create: ImperativeHandleCreator<T>,
  inputs?: Inputs | null,
  deps?: Deps
): void {
  return useImperativeHandle_React(ref, () => create.apply(null, inputs), deps || inputs);
}

export function useLayoutEffect(create: EffectCreator, inputs?: Inputs | null, deps?: Deps): void {
  return useLayoutEffect_React(() => create && create.apply(null, inputs), deps || inputs);
}

export function useMemo(create: MemoCreator, inputs?: Inputs | null, deps?: Deps): Function {
  return useMemo_React(() => create.apply(null, inputs), deps || inputs);
}
