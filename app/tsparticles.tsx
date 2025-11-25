import { useEffect, useMemo, useState, useRef  } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { GlobalStore } from "./GlobalStore";
export const BgParticles = () => {
  const [init, setInit] = useState(false);
const { is_dark } = GlobalStore();
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
 
 const containerRef = useRef<Container | undefined>(undefined);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log(container);
  };

   useEffect(() => {
    const c = containerRef.current;
    if (c) {
      c.refresh(); // or c.reset(options)
    }
  }, [is_dark]);
  const options: ISourceOptions = useMemo(
    () => ({
      key:is_dark.toString(),
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: is_dark ? '#ffffff' : '#330793ff'},
        links: {
          color: is_dark ? '#ffffff' : '#940984ff',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: { default: OutMode.out },
          speed: 6,
        },
        number: {
          density: { enable: true },
          value: 80,
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
    />
  );
};
