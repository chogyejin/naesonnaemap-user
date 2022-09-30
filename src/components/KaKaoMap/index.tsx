import React from "react";
import PlacesList from "./PlacesList";

const KakaomapComponent = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div style={{ width: "80vw", height: "80vh" }}>
      <div ref={ref} style={{ width: "100%", height: "100%" }} />
      <PlacesList />
    </div>
  );
});

KakaomapComponent.displayName = "KakaomapComponent";

export default KakaomapComponent;
