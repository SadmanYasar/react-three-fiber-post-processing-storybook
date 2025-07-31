import * as React from 'react';
import * as THREE from 'three';
import { Sphere, OrbitControls } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

export default {
  title: 'Effects/Bloom',
  component: Bloom,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 10)}>
        <Story />
      </Setup>
    ),
  ],
  argTypes: {
    intensity: {
      control: { type: 'range', min: 0, max: 5, step: 0.01 },
    },
    luminanceThreshold: {
      control: { type: 'range', min: 0, max: 2, step: 0.01 },
    },
    luminanceSmoothing: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
    },
    kernelSize: {
      options: Object.keys(KernelSize),
      mapping: KernelSize,
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Bloom>;

type Story = StoryObj<typeof Bloom>;

const BloomScene = (props: React.ComponentProps<typeof Bloom>) => {
  return (
    <>
      <color attach="background" args={['#111']} />
      <ambientLight intensity={0.01} />
      <OrbitControls />

      {/* This sphere will not glow */}
      <Sphere position={[-2, 0, 0]}>
        <meshStandardMaterial color="red" />
      </Sphere>

      {/* This sphere will glow */}
      <Sphere position={[0, 0, 0]}>
        <meshStandardMaterial
          color={[1.5, 0.5, 1]}
          emissive={[1.5, 0.5, 1]}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Sphere>

      <Sphere position={[2, 0, 0]}>
        <meshStandardMaterial
          color={[0.5, 1.5, 0.75]}
          emissive={[0.5, 1.5, 0.75]}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Sphere>

      <EffectComposer>
        <Bloom {...props} />
      </EffectComposer>
    </>
  );
};

export const BloomStory = {
  render: (args) => <BloomScene {...args} />,
  name: 'Default',
  args: {
    intensity: 1.0,
    luminanceThreshold: 0.1,
    luminanceSmoothing: 0.025,
    kernelSize: KernelSize.LARGE,
  },
} satisfies Story;