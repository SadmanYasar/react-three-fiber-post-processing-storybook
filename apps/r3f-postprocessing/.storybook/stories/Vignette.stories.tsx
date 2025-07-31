import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import { BlendFunction } from 'postprocessing';
import { EffectComposer, Vignette } from '@react-three/postprocessing';

export default {
  title: 'Effects/Vignette',
  component: Vignette,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof Vignette>;

const VignetteScene = (props: React.ComponentProps<typeof Vignette>) => (
  <>
    <color attach="background" args={['#eee']} />
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <OrbitControls />
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial color="mediumpurple" />
    </Sphere>
    <EffectComposer>
      <Vignette {...props} />
    </EffectComposer>
  </>
);

export const VignetteStory: StoryObj<typeof Vignette> = {
  render: (args) => <VignetteScene {...args} />,
  name: 'Default',
  args: {
    eskil: false,
    offset: 0.5,
    darkness: 0.5,
    blendFunction: BlendFunction.NORMAL,
  },
  argTypes: {
    offset: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    darkness: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    blendFunction: {
      options: Object.keys(BlendFunction),
      mapping: BlendFunction,
      control: { type: 'select' },
    },
  },
};
