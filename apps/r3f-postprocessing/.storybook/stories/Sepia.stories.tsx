import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import { EffectComposer, Sepia } from '@react-three/postprocessing';

export default {
  title: 'Effects/Sepia',
  component: Sepia,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof Sepia>;

const SepiaScene = (props: React.ComponentProps<typeof Sepia>) => (
  <>
    <color attach="background" args={['#fff']} />
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <OrbitControls />
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial color="mediumpurple" />
    </Sphere>
    <EffectComposer>
      <Sepia {...props} />
    </EffectComposer>
  </>
);

export const SepiaStory: StoryObj<typeof Sepia> = {
  render: (args) => <SepiaScene {...args} />,
  name: 'Default',
  args: {
    intensity: 1.0,
  },
  argTypes: {
    intensity: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
  },
};
