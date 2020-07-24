export interface Color {
    alpha: number;
    rgb: [number, number, number];
    luma: () => number;
    toARGB: () => string;
    toCSS: () => string;
    toHSL: () => {
        h: number;
        s: number;
        l: number;
        a: number;
    };
    toHSV: () => {
        h: number;
        s: number;
        v: number;
        a: number;
    };
    toRGB: () => string;
    type: 'Color';
    value?: string;
}

export interface Unit {
    denominator: any[];
    numerator: any[];
    parent: Dimension;
    clone: () => Unit;
    type: 'Unit';
    backupUnit?: string;
}

export interface Dimension {
    unit: Unit;
    value: number;
    toColor: () => Color;
    toCSS: () => string;
    type: 'Dimension';
}

export function render(
    input: string,
    /** less options */
    options: {
        [name: string]: any;
    },
    callback: (
        err?: any,
        output?: {
            css?: string;
        }
    ) => void
): void;
export function rgb(r: number | Dimension, g: number | Dimension, b: number | Dimension): Color;
export function rgb(color: Color): Color;
export function rgba(r: number | Dimension, g: number | Dimension, b: number | Dimension, a: number | Dimension): Color;
export function rgba(color: Color, a?: number | Dimension): Color;
export function argb(c: string | Color): Color;
export function hsl(h: number | Dimension, s: string | Dimension, l: string | Dimension): Color;
export function hsl(color: Color): Color;
export function hsla(h: number | Dimension, s: string | Dimension, l: string | Dimension, a: number | Dimension): Color;
export function hsla(color: Color, a?: number | Dimension): Color;
export function hsv(h: number | Dimension, s: string | Dimension, v: string | Dimension): Color;
export function hsva(h: number | Dimension, s: string | Dimension, v: string | Dimension, a: number | Dimension): Color;
export function hue(color: Color | string): Dimension;
export function saturation(color: Color | string): Dimension;
export function lightness(color: Color | string): Dimension;
export function hsvhue(color: Color | string): Dimension;
export function hsvsaturation(color: Color | string): Dimension;
export function hsvvalue(color: Color | string): Dimension;
export function red(color: Color | string): Dimension;
export function green(color: Color | string): Dimension;
export function blue(color: Color | string): Dimension;
export function alpha(color: Color | string): Dimension;
export function luma(color: Color | string): Dimension;
export function luminance(color: Color | string): Dimension;
export function saturate(color: Color | string, amount: string | Dimension): Color;
export function desaturate(color: Color | string, amount: string | Dimension): Color;
export function lighten(color: Color | string, amount: string | Dimension): Color;
export function darken(color: Color | string, amount: string | Dimension): Color;
export function fadein(color: Color | string, amount: string | Dimension): Color;
export function fadeout(color: Color | string, amount: string | Dimension): Color;
export function fade(color: Color | string, amount: string | Dimension): Color;
export function spin(color: Color | string, amount: number | Dimension): Color;
export function mix(color1: Color | string, color2: Color | string, weight?: string | Dimension): Color;
export function tint(color: Color | string, amount: string | Dimension): Color;
export function shade(color: Color | string, amount: string | Dimension): Color;
export function greyscale(color: Color | string): Color;
export function contrast(
    color: Color | string,
    dark?: Color | string,
    light?: Color | string,
    threshold?: string | Dimension
): Color;
export function color(color: Color | string): Color;
