import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import {
  BrightnessContrast,
  EffectComposer,
} from '@react-three/postprocessing';

export default {
  title: 'Effects/BrightnessContrast',
  component: BrightnessContrast,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
  argTypes: {
    brightness: {
      control: { type: 'range', min: -1, max: 1, step: 0.01 },
    },
    contrast: {
      control: { type: 'range', min: -1, max: 1, step: 0.01 },
    },
  },
} satisfies Meta<typeof BrightnessContrast>;

type Story = StoryObj<typeof BrightnessContrast>;

const BrightnessContrastScene = (
  props: React.ComponentProps<typeof BrightnessContrast>
) => {
  return (
    <>
      <color attach="background" args={['#333']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />

      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="mediumpurple" />
      </Sphere>

      <EffectComposer>
        <BrightnessContrast {...props} />
      </EffectComposer>
    </>
  );
};

export const BrightnessContrastStory = {
  render: (args) => <BrightnessContrastScene {...args} />,
  name: 'Default',
  args: {
    brightness: 0.0,
    contrast: 0.0,
  },
} satisfies Story;
