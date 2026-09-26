import { centerlineToSvgPath, outline, outlineToSvgPath, smooth, type InkPoint } from "./stroke";

type Path = Array<[number, number]>;

// "Mo", written the way a hand signs it: three humps of the M, a loop for
// the o, then a swoosh underneath.
const letters: Path = [
  [6, 124], [30, 100], [46, 62], [54, 30], [59, 62], [62, 112],
  [72, 70], [85, 38], [93, 56], [95, 112],
  [106, 70], [119, 40], [127, 58], [127, 100], [136, 116],
  [150, 110], [164, 88], [154, 68], [137, 78], [138, 104], [160, 113], [181, 98], [196, 80],
];

const swoosh: Path = [
  [24, 142], [96, 148], [184, 141], [254, 127], [310, 108],
];

export const signatureViewBox = "0 0 320 160";

export interface SignatureStroke {
  fill: string;
  reveal: string;
  reach: number;
}

// A broad nib: strokes pulled downward come out thick, strokes pushed up
// come out thin.
function nib(path: Path, weight: number): InkPoint[] {
  const dense = smooth(path.map(([x, y]) => ({ x, y, w: weight })));
  return dense.map((point, i) => {
    const prev = dense[Math.max(i - 1, 0)];
    const next = dense[Math.min(i + 1, dense.length - 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const down = dy / (Math.hypot(dx, dy) || 1);
    const t = i / (dense.length - 1);
    const taper = Math.min(1, t * 8, (1 - t) * 6 + 0.25);
    return { ...point, w: weight * (0.45 + 0.55 * Math.max(down, 0)) * (0.35 + 0.65 * taper) };
  });
}

function build(path: Path, weight: number): SignatureStroke {
  const points = nib(path, weight);
  return {
    fill: outlineToSvgPath(outline(points)),
    reveal: centerlineToSvgPath(points),
    reach: weight * 2 + 4,
  };
}

export const signatureStrokes: SignatureStroke[] = [build(letters, 5.2), build(swoosh, 4)];
