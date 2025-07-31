import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Meta, StoryObj } from '@storybook/react-vite';
import { BlendFunction } from 'postprocessing';
import { Grid, EffectComposer } from '@react-three/postprocessing';
import { Setup } from '../Setup';

export default {
  title: 'Effects/Grid',
  component: Grid,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof Grid>;

export const GridStory: StoryObj<typeof Grid> = {
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
        <Grid {...args} />
      </EffectComposer>
    </>
  ),
  name: 'Grid',
  args: {
    scale: 1.0,
    lineWidth: 0.0,
    blendFunction: BlendFunction.NORMAL,
  },
  argTypes: {
    scale: { control: { type: 'range', min: 0.1, max: 10, step: 0.1 } },
    lineWidth: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    blendFunction: {
      options: Object.keys(BlendFunction),
      mapping: BlendFunction,
      control: { type: 'select' },
    },
  },
};
