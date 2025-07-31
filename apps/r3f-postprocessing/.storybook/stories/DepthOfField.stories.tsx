import * as React from 'react';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Meta, StoryObj } from '@storybook/react-vite';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Setup } from '../Setup';

export default {
  title: 'Effects/DepthOfField',
  component: DepthOfField,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 2, 12)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof DepthOfField>;

const DepthOfFieldScene = (
  props: React.ComponentProps<typeof DepthOfField>
) => {
  return (
    <>
      <color attach="background" args={['#333']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {[...Array(5)].map((_, i) => (
        <Sphere key={i} args={[0.5, 32, 32]} position={[i * 2 - 4, 0, 0]}>
          <meshStandardMaterial color="white" />
        </Sphere>
      ))}
      <EffectComposer>
        <DepthOfField {...props} />
      </EffectComposer>
    </>
  );
};

export const DepthOfFieldStory: StoryObj<typeof DepthOfField> = {
  render: (args) => <DepthOfFieldScene {...args} />,
  name: 'DepthOfField',
  args: {
    focusDistance: 0,
    focalLength: 0.1,
    bokehScale: 2.0,
  },
  argTypes: {
    focusDistance: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    focalLength: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    bokehScale: { control: { type: 'range', min: 0, max: 10, step: 0.1 } },
  },
};
