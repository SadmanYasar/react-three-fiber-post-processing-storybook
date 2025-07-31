import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls, Sphere } from '@react-three/drei';
import { Setup } from '../Setup';
import { Meta, StoryObj } from '@storybook/react-vite';
import { KernelSize } from 'postprocessing';
import { EffectComposer, SelectiveBloom } from '@react-three/postprocessing';

export default {
  title: 'Effects/SelectiveBloom',
  component: SelectiveBloom,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 0, 5)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof SelectiveBloom>;

const SelectiveBloomScene = (
  props: React.ComponentProps<typeof SelectiveBloom>
) => {
  const lightRef = React.useRef<THREE.PointLight>(null!);
  const selectedRef = React.useRef<THREE.Mesh>(null!);
  const notSelectedRef = React.useRef<THREE.Mesh>(null!);

  return (
    <>
      <color attach="background" args={['#111']} />
      <ambientLight intensity={0.1} />
      <pointLight ref={lightRef} position={[10, 10, 10]} />
      <OrbitControls />
      <Sphere ref={selectedRef} position={[-1.5, 0, 0]}>
        <meshStandardMaterial
          color="hotpink"
          emissive="magenta"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Sphere>
      <Sphere ref={notSelectedRef} position={[1.5, 0, 0]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      <EffectComposer>
        <SelectiveBloom
          {...props}
          lights={[lightRef]}
          selection={[selectedRef]}
        />
      </EffectComposer>
    </>
  );
};

export const SelectiveBloomStory: StoryObj<typeof SelectiveBloom> = {
  render: (args) => <SelectiveBloomScene {...args} />,
  name: 'Default',
  args: {
    intensity: 2.0,
    luminanceThreshold: 0.1,
    luminanceSmoothing: 0.025,
    kernelSize: KernelSize.LARGE,
  },
  argTypes: {
    kernelSize: {
      options: Object.keys(KernelSize),
      mapping: KernelSize,
      control: { type: 'select' },
    },
  },
};
