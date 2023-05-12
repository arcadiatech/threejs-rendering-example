export const buttons = [
  {
    text: "Background trees",
    prop: "drawBackgroundTrees",
  },
  {
    text: "Cast shadows",
    prop: "enableShadows",
  },
  {
    text: "Cast background trees shadow",
    prop: "enableBackgroundTreeShadow",
  },
  {
    text: "Ground texture",
    prop: "useGroundTexture",
  },
];

export function generateButtonId(button) {
  return button.text.split(" ").join("-").toLocaleLowerCase();
}

export function generateButtonIndicatorId(button) {
  return `${generateButtonId(button)}-indicator`;
}
