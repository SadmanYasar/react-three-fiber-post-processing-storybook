import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import { BlendFunction } from 'postprocessing';
import { EffectComposer, SSAO } from '@react-three/postprocessing';

export default {
  title: 'Effects/SSAO',
  component: SSAO,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 3, 10)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof SSAO>;

const SSAOScene = (props: React.ComponentProps<typeof SSAO>) => (
  <>
    <color attach="background" args={['#fff']} />
    <ambientLight intensity={0.1} />
    <pointLight position={[10, 10, 10]} />
    <OrbitControls />
    <Sphere position={[0, 0.5, 0]} args={[0.5, 32, 32]}>
      <meshStandardMaterial color="hotpink" />
    </Sphere>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="white" />
    </mesh>
    <EffectComposer>
      <SSAO {...props} />
    </EffectComposer>
  </>
);

export const SSAOStory: StoryObj<typeof SSAO> = {
  render: (args) => <SSAOScene {...args} />,
  name: 'Default',
  args: {
    blendFunction: BlendFunction.MULTIPLY,
    samples: 30,
    rings: 4,
    distanceThreshold: 1.0,
    distanceFalloff: 0.0,
    rangeThreshold: 0.5,
    rangeFalloff: 0.1,
    luminanceInfluence: 0.9,
    radius: 20,
    bias: 0.5,
  },
  argTypes: {
    blendFunction: {
      options: Object.keys(BlendFunction),
      mapping: BlendFunction,
      control: { type: 'select' },
    },
  },
};
