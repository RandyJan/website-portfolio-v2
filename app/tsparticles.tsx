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
          push: { quantity: 6 },
          repulse: { distance: 250, duration: 0.6 },
        },
      },
      particles: {
        color: { value: is_dark ? '#8b5cf6' : '#7c3aedff'},
        links: {
          color: is_dark ? '#a78bfa' : '#c4b5fdff',
          distance: 180,
          enable: true,
          opacity: 0.4,
          width: 1.5,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: { default: OutMode.out },
          speed: 3,
        },
        number: {
          density: { enable: true },
          value: 120,
        },
        opacity: { value: 0.6, animation: { enable: true, speed: 0.5, minimumValue: 0.2 } },
        shape: { type: "circle" },
        size: { value: { min: 2, max: 8 }, animation: { enable: true, speed: 1, minimumValue: 1 } },
      },
      detectRetina: true,
    }),
    [is_dark]
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
