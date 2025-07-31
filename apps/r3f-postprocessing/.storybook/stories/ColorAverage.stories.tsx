import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import {
  BlendFunction,
} from 'postprocessing';
import {
  ColorAverage,
  EffectComposer,
} from '@react-three/postprocessing';

export default {
  title: 'Effects/ColorAverage',
  component: ColorAverage,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
  argTypes: {
    blendFunction: {
      options: Object.keys(BlendFunction),
      mapping: BlendFunction,
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof ColorAverage>;

const ColorAverageScene = (
  props: React.ComponentProps<typeof ColorAverage>,
) => (
  <>
    <color attach="background" args={['#333']} />
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <OrbitControls />
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial color="mediumpurple" />
    </Sphere>
    <EffectComposer>
      <ColorAverage {...props} />
    </EffectComposer>
  </>
);

export const ColorAverageStory: StoryObj<typeof ColorAverage> = {
  render: (args) => <ColorAverageScene {...args} />,
  name: 'ColorAverage',
  args: {
    blendFunction: BlendFunction.NORMAL,
  },
};