import { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";

import useQueryState from "./useQueryState";

import Blob from "./Blob";

export default function Scene({ center, enableShadowMap }: any) {
  const blob = useRef();
  const { gl, size } = useThree();

  const notLoadedBg = "#141518";
  const [isLoaded, setLoaded] = useState(false);

  const [clearColor, setClearColor] = useQueryState("clearColor", "#657174");
  // const [enableSky, setEnableSky] = useQueryState('sky', false);

  useEffect(() => {
    gl.setClearColor(notLoadedBg, 1.0);
    setLoaded(true);
  }, [gl]);

  //   useEffect(
  //     () =>
  //       useUIStore.subscribe(
  //         ({ currentPageUnlimited, currentPageFactor, mouse, vx }) => {
  //           local.currentPageUnlimited = currentPageUnlimited;
  //           local.currentPageFactor = currentPageFactor;
  //           local.mouse = mouse;
  //           local.vx = vx;
  //         }
  //       ),
  //     [local]
  //   );

  const isPortrait = size.height > size.width;
  const blobPos = [
    center[0],
    center[1] + (isPortrait ? 0.0 : 0),
    center[2] + 0,
  ];

  return (
    <>
      <Blob ref={blob} position={blobPos} enableShadow={enableShadowMap} />
    </>
  );
}
