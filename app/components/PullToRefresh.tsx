import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

interface IProps {
  onRefresh: () => void;
}

const PullToRefresh = ({ onRefresh }: IProps) => {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsPulling(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const distance = e.touches[0].clientY - touchStartY.current;

    if (distance > 20 && window.scrollY === 0) {
      setIsPulling(true);
    }
  };

  const handleTouchEnd = async (e: TouchEvent) => {
    touchEndY.current = e.changedTouches[0].clientY;
    const distance = touchEndY.current - touchStartY.current;

    if (distance > 50 && window.scrollY === 0) {
      setIsPulling(false);
      setIsRefreshing(true);

      try {
        await onRefresh();
      } finally {
        setTimeout(() => {
          setIsRefreshing(false);
        }, 500);
      }
    } else {
      setIsPulling(false);
    }
  };

  useEffect(
    () => {
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPulling]
  );

  return isPulling || isRefreshing ? (
    <div className="flex items-center justify-center w-auto bg-slate-100 rounded-lg shadow-lg m-2 p-4">
      <div className="text-black">
        {isRefreshing ? <Loader /> : "↓ Pull to refresh"}
      </div>
    </div>
  ) : null;
};

export default PullToRefresh;
