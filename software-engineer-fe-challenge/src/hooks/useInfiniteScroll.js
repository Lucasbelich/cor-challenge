import { useEffect, useRef, useCallback } from "react";

const useInfiniteScroll = (callback, hasNextPage, loading) => {
  const observerRef = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          callback();
        }
      });
      
      if (node) {
        observerRef.current.observe(node);
      }
    },
    [loading, hasNextPage, callback]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return lastElementRef;
};

export default useInfiniteScroll; 