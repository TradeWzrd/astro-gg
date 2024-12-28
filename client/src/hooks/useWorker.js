import { useEffect, useRef, useCallback } from 'react';

const useWorker = (workerPath) => {
  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker(workerPath);

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [workerPath]);

  const postMessage = useCallback((message) => {
    if (workerRef.current) {
      return new Promise((resolve) => {
        const handleMessage = (e) => {
          workerRef.current.removeEventListener('message', handleMessage);
          resolve(e.data);
        };

        workerRef.current.addEventListener('message', handleMessage);
        workerRef.current.postMessage(message);
      });
    }
  }, []);

  return { postMessage };
};

export default useWorker;
