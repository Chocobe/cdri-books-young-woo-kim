'use client';

// import { useCounterStore } from '@/common/stores/counterStore/useCounterStore';
import { usePersistCountStore } from '@/common/stores/_counterStore/_useCounterStore';
import { useEffect } from 'react';

function Counter() {
  // const count = useCounterStore(s => s.count);
  // const decrease = useCounterStore(s => s.decrease);
  // const increase = useCounterStore(s => s.increase);
  const count = usePersistCountStore(s => s.nested.persistCount);
  const decrease = usePersistCountStore(s => s.decrease);
  const increase = usePersistCountStore(s => s.increase);

  useEffect(() => {
    usePersistCountStore.persist.rehydrate();
  }, []);

  return (
    <div>
      <div>
        Count: {count}
      </div>

      <div>
        <button onClick={decrease}>
          Decrease
        </button>
        <button onClick={increase}>
          Increase
        </button>
      </div>
    </div>
  );
}
export default Counter;