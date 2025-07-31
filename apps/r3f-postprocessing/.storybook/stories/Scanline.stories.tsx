import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import { EffectComposer, Scanline } from '@react-three/postprocessing';

export default {
  title: 'Effects/Scanline',
  component: Scanline,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof Scanline>;

const ScanlineScene = (props: React.ComponentProps<typeof Scanline>) => (
  <>
    <color attach="background" args={['#333']} />
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <OrbitControls />
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial color="white" />
    </Sphere>
    <EffectComposer>
      <Scanline {...props} />
    </EffectComposer>
  </>
);

export const ScanlineStory: StoryObj<typeof Scanline> = {
  render: (args) => <ScanlineScene {...args} />,
  name: 'Default',
  args: {
    density: 1.25,
  },
  argTypes: {
    density: { control: { type: 'range', min: 0, max: 10, step: 0.25 } },
  },
};
