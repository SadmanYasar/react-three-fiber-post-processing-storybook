import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import { EffectComposer, SMAA } from '@react-three/postprocessing';

export default {
  title: 'Effects/SMAA',
  component: SMAA,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof SMAA>;

const SMAAScene = (props: React.ComponentProps<typeof SMAA>) => (
  <>
    <color attach="background" args={['#333']} />
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <OrbitControls />
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial color="white" wireframe />
    </Sphere>
    <EffectComposer multisampling={0}>
      <SMAA {...props} />
    </EffectComposer>
  </>
);

export const SMAAStory: StoryObj<typeof SMAA> = {
  render: (args) => <SMAAScene {...args} />,
  name: 'Default',
};
