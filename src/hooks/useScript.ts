import { useEffect, useState } from "react";

const useScript = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const $script = document.createElement("script");
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&libraries=services`;
    $script.addEventListener("load", () => setIsLoaded(true));
    document.head.appendChild($script);
  }, []);

  return isLoaded;
};

export default useScript;
