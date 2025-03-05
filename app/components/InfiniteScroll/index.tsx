import React from "react";
import Loader from "../Loader";
import { loaderStyle } from "./style.css";

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  children?: React.ReactNode;
}

const Index = ({ onLoadMore, hasMore, children }: InfiniteScrollProps) => {
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasMore) {
      onLoadMore();
    }
  };

  React.useEffect(
    () => {
      observerRef.current = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      });

      if (sentinelRef.current) {
        observerRef.current.observe(sentinelRef.current);
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasMore]
  );

  React.useEffect(() => {
    if (observerRef.current && sentinelRef.current) {
      observerRef.current.disconnect();
      observerRef.current.observe(sentinelRef.current);
    }
  }, [hasMore]);

  return (
    <div>
      {children}
      <div className={loaderStyle} ref={sentinelRef}>
        {hasMore && <Loader />}
      </div>
    </div>
  );
};

export default Index;
