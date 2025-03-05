import useIsMobile from "../../hooks/useIsMobile";
import { loader } from "./style.css";

const Index = () => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <div className="flex items-center justify-center w-auto bg-slate-100 rounded-lg shadow-lg m-2 p-4">
          <div className="flex flex-row items-center justify-center gap-2">
            <span className={loader}></span>
            <span className="text-black">Loading...</span>
          </div>
        </div>
      ) : (
        <span className={loader} />
      )}
    </>
  );
};

export default Index;
