import * as React from 'react';
import * as THREE from 'three';

import { Setup } from '../Setup';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Noise, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { OrbitControls } from '@react-three/drei';

export default {
  title: 'Effects/Noise',
  component: Noise,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(-20, 20, -20)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof Noise>;

type Story = StoryObj<typeof Noise>;

const NoiseScene1 = (props: React.ComponentProps<typeof Noise>) => {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 20, 10]} />
      <mesh>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <EffectComposer>
        <Noise {...props} />
      </EffectComposer>
    </>
  );
};

export const NoiseStory = {
  render: (args) => <NoiseScene1 {...args} />,
  name: 'Noise',
  args: {
    premultiply: true,
    blendFunction: BlendFunction.SCREEN,
  },
} satisfies Story;
