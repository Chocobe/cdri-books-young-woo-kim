import { cloneDeep, merge } from 'es-toolkit/object';
import { 
  create as actualCreate,
  StateCreator as ActualStateCreator,
} from 'zustand';
import { createJSONStorage, PersistOptions } from 'zustand/middleware';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export * from 'zustand';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// store with immer, devtools
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

export type StateCreator<TStore, TSlice> = ActualStateCreator<
  TStore,
  [['zustand/immer', never], ['zustand/devtools', never]],
  [],
  TSlice
>;

export const create = <TStore>() => (
  stateCreator: StateCreator<TStore, TStore>,
  storeName: string
) => {
  return actualCreate<TStore>()(
    devtools(
      immer(stateCreator),
      {
        name: storeName,
      }
    )
  );
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
//
// store with immer, devtools, persist
//
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
export type StateCreatorWithPersist<TStore, TSlice> = ActualStateCreator<
  TStore,
  [['zustand/immer', never], ['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  TSlice
>;

export const createWithPersist = <TStore>() => (
  stateCreator: StateCreatorWithPersist<TStore, TStore>,
  options: PersistOptions<TStore>
) => {
  return actualCreate<TStore>()(
    persist(
      devtools(
        immer(stateCreator),
        {
          name: options.name,
        }
      ),
      {
        // NOTE: SSR 사용처가 생기면 `false` 로 변경하기
        // skipHydration: true,
        storage: createJSONStorage<TStore>(() => window.localStorage),
        merge: (persistedState = {}, currentState) => {
          return merge(
            cloneDeep(currentState) as object,
            cloneDeep(persistedState) as object
          ) as TStore;
        },
        ...options,
      }
    )
  );
};