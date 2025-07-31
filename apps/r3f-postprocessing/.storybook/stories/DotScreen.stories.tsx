import * as React from 'react';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Meta, StoryObj } from '@storybook/react-vite';
import { BlendFunction } from 'postprocessing';
import { DotScreen, EffectComposer } from '@react-three/postprocessing';

import * as THREE from 'three';
import { Setup } from '../Setup';

export default {
  title: 'Effects/DotScreen',
  component: DotScreen,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 2, 12)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof DotScreen>;

export const DotScreenStory: StoryObj<typeof DotScreen> = {
  render: (args) => (
    <>
      <color attach="background" args={['#333']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      <EffectComposer>
        <DotScreen {...args} />
      </EffectComposer>
    </>
  ),
  name: 'DotScreen',
  args: {
    blendFunction: BlendFunction.NORMAL,
    angle: Math.PI / 4,
    scale: 1.0,
  },
  argTypes: {
    blendFunction: {
      options: Object.keys(BlendFunction),
      mapping: BlendFunction,
      control: { type: 'select' },
    },
    angle: { control: { type: 'range', min: 0, max: Math.PI * 2, step: 0.01 } },
    scale: { control: { type: 'range', min: 0.1, max: 10, step: 0.1 } },
  },
};
