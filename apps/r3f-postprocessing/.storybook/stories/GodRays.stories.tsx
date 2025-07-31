import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { KernelSize } from 'postprocessing';
import { GodRays, EffectComposer } from '@react-three/postprocessing';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Setup } from '../Setup';

export default {
  title: 'Effects/GodRays',
  component: GodRays,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof GodRays>;

const GodRaysScene = (props: React.ComponentProps<typeof GodRays>) => {
  const sunRef = React.useRef<THREE.Mesh>(null!);
  const { sun, ...rest } = props;
  return (
    <>
      <color attach="background" args={['#111']} />
      <OrbitControls />
      {/* This sphere acts as the sun */}
      <Sphere ref={sunRef} args={[0.5, 68, 68]} position={[0, 0, -5]}>
        <meshBasicMaterial color="white" toneMapped={false} />
      </Sphere>
      {/* This sphere is just an object in the scene */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="black" />
      </Sphere>
      <EffectComposer>
        <GodRays sun={sunRef} {...rest} />
      </EffectComposer>
    </>
  );
};

export const GodRaysStory: StoryObj<typeof GodRays> = {
  render: (args) => <GodRaysScene {...args} />,
  name: 'GodRays',
  args: {
    samples: 35,
    density: 1,
    decay: 0.9,
    weight: 0.4,
    exposure: 0.6,
    clampMax: 1,
    blur: true,
    kernelSize: KernelSize.SMALL,
  },
  argTypes: {
    kernelSize: {
      options: Object.keys(KernelSize),
      mapping: KernelSize,
      control: { type: 'select' },
    },
  },
};
