/* eslint-disable react/prop-types */

export const CustomSVG = ({ id, color = "#a6a6a6", size = 20 }) => (
  <svg fill={color} width={size} height={size} className="ico">
    <use href={`/public/images/project-linked-sprite.svg#${id}`} />
  </svg>
);
