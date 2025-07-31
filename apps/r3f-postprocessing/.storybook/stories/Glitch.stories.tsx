import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Glitch, EffectComposer } from '@react-three/postprocessing';
import * as Three from 'three';
import { Setup } from '../Setup';

export default {
  title: 'Effects/Glitch',
  component: Glitch,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof Glitch>;

export const GlitchStory: StoryObj<typeof Glitch> = {
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
        <Glitch {...args} />
      </EffectComposer>
    </>
  ),
  name: 'Glitch',
  args: {
    active: true,
    strength: new Three.Vector2(0.01, 0.2),
    delay: new Three.Vector2(1.5, 3.5),
    duration: new Three.Vector2(0.1, 0.3),
    ratio: 0.85,
  },
};
