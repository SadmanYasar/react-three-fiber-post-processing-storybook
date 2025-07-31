import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import { BlendFunction, KernelSize } from 'postprocessing';
import { EffectComposer, Outline } from '@react-three/postprocessing';

export default {
  title: 'Effects/Outline',
  component: Outline,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof Outline>;

const OutlineScene = (props: React.ComponentProps<typeof Outline>) => {
  const ref1 = React.useRef<THREE.Mesh>(null!);
  const ref2 = React.useRef<THREE.Mesh>(null!);
  return (
    <>
      <color attach="background" args={['#333']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Sphere ref={ref1} position={[-1.5, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Sphere>
      <Sphere ref={ref2} position={[1.5, 0, 0]}>
        <meshStandardMaterial color="orange" />
      </Sphere>
      <EffectComposer>
        <Outline {...props} selection={[ref1, ref2]} />
      </EffectComposer>
    </>
  );
};

export const OutlineStory: StoryObj<typeof Outline> = {
  render: (args) => <OutlineScene {...args} />,
  name: 'Default',
  args: {
    blendFunction: BlendFunction.SCREEN,
    edgeStrength: 2.5,
    pulseSpeed: 0.0,
    blur: false,
    xRay: true,
    kernelSize: KernelSize.LARGE,
  },
  argTypes: {
    blendFunction: {
      options: Object.keys(BlendFunction),
      mapping: BlendFunction,
      control: { type: 'select' },
    },
    kernelSize: {
      options: Object.keys(KernelSize),
      mapping: KernelSize,
      control: { type: 'select' },
    },
    visibleEdgeColor: { control: 'color' },
    hiddenEdgeColor: { control: 'color' },
  },
};
