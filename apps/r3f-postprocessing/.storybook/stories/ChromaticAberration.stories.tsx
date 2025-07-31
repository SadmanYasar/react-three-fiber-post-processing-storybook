import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import {
  ChromaticAberration,
  EffectComposer,
} from '@react-three/postprocessing';

export default {
  title: 'Effects/ChromaticAberration',
  component: ChromaticAberration,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
  argTypes: {
    offsetX: {
      name: 'offset.x',
      control: { type: 'range', min: -0.1, max: 0.1, step: 0.001 },
    },
    offsetY: {
      name: 'offset.y',
      control: { type: 'range', min: -0.1, max: 0.1, step: 0.001 },
    },
  },
} satisfies Meta<typeof ChromaticAberration>;

type Story = StoryObj<
  typeof ChromaticAberration & { offsetX?: number; offsetY?: number }
>;

const ChromaticAberrationScene = (
  props: React.ComponentProps<typeof ChromaticAberration>
) => {
  return (
    <>
      <color attach="background" args={['#333']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="white" />
      <OrbitControls />

      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="white" />
      </Sphere>

      <EffectComposer>
        <ChromaticAberration {...props} />
      </EffectComposer>
    </>
  );
};

export const ChromaticAberrationStory: Story = {
  render: ({ offsetX, offsetY, ...args }) => {
    const props = {
      ...args,
      offset: new THREE.Vector2(offsetX, offsetY),
    };
    return <ChromaticAberrationScene {...props} />;
  },
  name: 'Default',
  args: {
    offsetX: 0.002,
    offsetY: 0.002,
  },
};
