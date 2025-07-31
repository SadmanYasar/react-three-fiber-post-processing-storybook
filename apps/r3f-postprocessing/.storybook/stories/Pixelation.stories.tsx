import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import { EffectComposer, Pixelation } from '@react-three/postprocessing';

export default {
  title: 'Effects/Pixelation',
  component: Pixelation,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof Pixelation>;

const PixelationScene = (props: React.ComponentProps<typeof Pixelation>) => (
  <>
    <color attach="background" args={['#333']} />
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <OrbitControls />
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial color="white" />
    </Sphere>
    <EffectComposer>
      <Pixelation {...props} />
    </EffectComposer>
  </>
);

export const PixelationStory: StoryObj<typeof Pixelation> = {
  render: (args) => <PixelationScene {...args} />,
  name: 'Default',
  args: {
    granularity: 5,
  },
  argTypes: {
    granularity: { control: { type: 'range', min: 0, max: 30, step: 1 } },
  },
};
