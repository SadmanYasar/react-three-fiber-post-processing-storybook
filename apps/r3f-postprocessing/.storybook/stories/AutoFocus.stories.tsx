import React, { memo } from 'react';
import {
  Center,
  Resize,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  CameraControls,
  Stats,
} from '@react-three/drei';
import * as THREE from 'three';

import { Setup } from '../Setup';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Autofocus, EffectComposer } from '@react-three/postprocessing';

export default {
  title: 'Effects/Autofocus',
  component: Autofocus,
  decorators: [
    (Story) => (
      <Setup cameraPosition={new THREE.Vector3(0, 2, 12)}>
        <Story />
      </Setup>
    ),
  ],
} satisfies Meta<typeof Autofocus>;

type Story = StoryObj<typeof Autofocus>;

const Shadows = memo(() => (
  <AccumulativeShadows
    temporal
    frames={100}
    color="#9d4b4b"
    colorBlend={0.5}
    alphaTest={0.9}
    scale={20}
  >
    <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
  </AccumulativeShadows>
));

//TODO - Update the environment and suzi import here
const city = import("@pmndrs/assets/hdri/city.exr");
const suzi = import(`@pmndrs/assets/models/suzi.glb`);


//https://react-postprocessing.docs.pmnd.rs/effects/autofocus#example
const AutofocusScene1 = (props: React.ComponentProps<typeof Autofocus>) => {
  return (
    <group position-y={-0.5} position-x={-1}>
      <Center top>
        <Resize scale={3.5}>
          <mesh castShadow>
            <torusGeometry args={[0.5, 64, 64]} />
            <meshStandardMaterial color="#9d4b4b" />
          </mesh>
        </Resize>
      </Center>
      <Center top position={[-2, 0, 2]}>
        <mesh castShadow>
          <sphereGeometry args={[0.5, 64, 64]} />
          <meshStandardMaterial color="#9d4b4b" />
        </mesh>
      </Center>
      <Center top position={[2.5, 0, 1]}>
        <mesh castShadow rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial color="#9d4b4b" />
        </mesh>
      </Center>

      <EffectComposer>
        <Autofocus {...props} />
      </EffectComposer>

      <Shadows />
      <CameraControls />
      <Environment preset="city" />
      <Stats />
    </group>
  );
};

export const AutofocusStory = {
  render: (args) => <AutofocusScene1 {...args} />,
  name: 'Default',
  args: {
    mouse: false,
    debug: 0.02,
    smoothTime: 0.5,
    manual: false,
    focusRange: 0.001,
    bokehScale: 8.0,
  },
  argTypes: {
    debug: {
      control: { type: 'range', min: 0, max: 0.15, step: 0.001 },
    },
    smoothTime: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
    },
    focusRange: {
      control: { type: 'range', min: 0, max: 1, step: 0.001 },
    },
    bokehScale: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
    },
  },
} satisfies Story;
