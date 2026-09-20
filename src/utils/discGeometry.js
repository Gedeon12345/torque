/** Géométrie du disque de frein (SVG centré sur l'origine, angles en degrés). */
export function polarPoint(radius, angleDeg) {
  const radians = (angleDeg * Math.PI) / 180;
  return {
    x: Number((radius * Math.cos(radians)).toFixed(2)),
    y: Number((radius * Math.sin(radians)).toFixed(2)),
  };
}

export function ringPoints(count, radius, offsetDeg = 0) {
  return Array.from({ length: count }, (_, index) =>
    polarPoint(radius, (index * 360) / count + offsetDeg),
  );
}

/** Secteur d'anneau entre deux rayons et deux angles (sens horaire). */
export function sectorPath(innerRadius, outerRadius, startDeg, endDeg) {
  const outerStart = polarPoint(outerRadius, startDeg);
  const outerEnd = polarPoint(outerRadius, endDeg);
  const innerEnd = polarPoint(innerRadius, endDeg);
  const innerStart = polarPoint(innerRadius, startDeg);

  return [
    `M${outerStart.x} ${outerStart.y}`,
    `A${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L${innerEnd.x} ${innerEnd.y}`,
    `A${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}Z`,
  ].join("");
}
