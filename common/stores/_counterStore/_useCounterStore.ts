import { create, createWithPersist } from '@/common/utils/zustand/zustand-utils';

type TCountStore = {
  count: number;
  decrease: () => void;
  increase: () => void;
};

export const useCounterStore = create<TCountStore>()((set) => ({
  count: 0,
  decrease: () => {
    set(s => {
      s.count--;
    }, undefined, 'decrease');
  },
  increase: () => {
    set(s => {
      s.count++;
    }, undefined, 'increase');
  },
}), 'Counter');

type TPersistCountStore = {
  nested: {
    count: number;
    persistCount: number;
  },
  decrease: () => void;
  increase: () => void;
};

export const usePersistCountStore = createWithPersist<TPersistCountStore>()((set) => ({
  nested: {
    count: 0,
    persistCount: 0,
  },
  decrease: () => {
    set(s => {
      s.nested.count--;
      s.nested.persistCount--;
    }, undefined, 'decrease');
  },
  increase: () => {
    set(s => {
      s.nested.count++;
      s.nested.persistCount++;
    }, undefined, 'increase');
  },
}), {
  name: 'PersisCount',
  // partialize: state => ({
  //   persistCount: state.persistCount as ,
  // }),
  partialize(state) {
    return {
      // persistCount: state.nested.persistCount,
      nested: {
        persistCount: state.nested.persistCount,
      },
    } as TPersistCountStore;
  },
  // merge: (persistedState = {}, currentState) => {
  //   return merge(persistedState as object, currentState);
  // },
});