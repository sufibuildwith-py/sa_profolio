export interface Asset3DRegistryItem {
  id: string;
  name: string;
  category: "LIGHTING" | "AUDIO" | "CAMERA" | "STAGE";
  file: string;
  source: string;
  license: string;
  attributionRequired: boolean;
  author: string;
  usageNotes: string;
  scale: number;
  initialRotation: [number, number, number];
  initialPosition: [number, number, number];
}

export const asset3DRegistry: Asset3DRegistryItem[] = [
  {
    id: "stage-lighting-fixture",
    name: "Production Lighting Fixture (PBR Lantern/Spotlight)",
    category: "LIGHTING",
    file: "/models/lantern.glb",
    source: "KhronosGroup glTF-Sample-Assets (Microsoft / glTF 2.0 PBR Sample Collection)",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    attributionRequired: true,
    author: "Microsoft / Khronos Group",
    usageNotes: "Industrial stage lighting lantern fixture with PBR metallic-roughness workflow and glass enclosure. Used in hero cinematic stage lighting environment.",
    scale: 0.085,
    initialRotation: [0, -0.4, 0],
    initialPosition: [1.2, -0.8, 0],
  },
  {
    id: "sound-system-boombox",
    name: "Acoustic Sound & Audio Monitor Unit",
    category: "AUDIO",
    file: "/models/boombox.glb",
    source: "KhronosGroup glTF-Sample-Assets (Microsoft / glTF 2.0 PBR Sample Collection)",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    attributionRequired: true,
    author: "Microsoft / Khronos Group",
    usageNotes: "PBR acoustic speaker enclosure and playback hardware. Utilized in audio capabilities and toolkit inspection.",
    scale: 120.0,
    initialRotation: [0.1, -0.6, 0],
    initialPosition: [0, 0, 0],
  },
  {
    id: "cinema-camera-package",
    name: "Optical Camera Hardware Package",
    category: "CAMERA",
    file: "/models/camera.glb",
    source: "KhronosGroup glTF-Sample-Assets (glTF 2.0 Reference Models)",
    license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
    attributionRequired: true,
    author: "Khronos Group",
    usageNotes: "Multi-element optical cinema camera body with precision brass and leather housing for live coverage visual.",
    scale: 0.45,
    initialRotation: [0.1, 0.5, 0],
    initialPosition: [0, -0.5, 0],
  }
];
