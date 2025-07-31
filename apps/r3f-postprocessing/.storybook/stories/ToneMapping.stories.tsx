import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import { BlendFunction } from 'postprocessing';
import { EffectComposer, ToneMapping } from '@react-three/postprocessing';

export default {
  title: 'Effects/ToneMapping',
  component: ToneMapping,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof ToneMapping>;

const ToneMappingScene = (props: React.ComponentProps<typeof ToneMapping>) => (
  <>
    <color attach="background" args={['#333']} />
    <ambientLight intensity={0.1} />
    <pointLight intensity={10} position={[5, 5, 5]} />
    <OrbitControls />
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial color="white" />
    </Sphere>
    <EffectComposer>
      <ToneMapping {...props} />
    </EffectComposer>
  </>
);

export const ToneMappingStory: StoryObj<typeof ToneMapping> = {
  render: (args) => <ToneMappingScene {...args} />,
  name: 'Default',
  args: {
    blendFunction: BlendFunction.NORMAL,
    adaptive: true,
    resolution: 256,
    middleGrey: 0.6,
    maxLuminance: 16.0,
    averageLuminance: 1.0,
    adaptationRate: 1.0,
  },
  argTypes: {
    blendFunction: {
      options: Object.keys(BlendFunction),
      mapping: BlendFunction,
      control: { type: 'select' },
    },
  },
};
