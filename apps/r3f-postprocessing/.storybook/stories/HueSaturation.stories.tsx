import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import { HueSaturation, EffectComposer } from '@react-three/postprocessing';

export default {
  title: 'Effects/HueSaturation',
  component: HueSaturation,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof HueSaturation>;

const HueSaturationScene1 = (
  props: React.ComponentProps<typeof HueSaturation>
) => {
  return (
    <>
      <color attach="background" args={['#333']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="orange" />
      </Sphere>
      <EffectComposer>
        <HueSaturation {...props} />
      </EffectComposer>
    </>
  );
};

export const HueSaturationStory: StoryObj<typeof HueSaturation> = {
  render: (args) => <HueSaturationScene1 {...args} />,
  name: 'HueSaturation',
  args: {
    hue: 0,
    saturation: 0,
  },
  argTypes: {
    hue: { control: { type: 'range', min: 0, max: Math.PI * 2, step: 0.01 } },
    saturation: { control: { type: 'range', min: -1, max: 1, step: 0.01 } },
  },
};
