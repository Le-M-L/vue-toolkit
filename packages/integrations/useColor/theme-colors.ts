function parseColor(color = "") {
    if (typeof color !== "string") {
        throw new TypeError("Color should be string!");
    }

    const hexMatch = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(color);
    if (hexMatch) {
        return hexMatch.splice(1).map((c) => Number.parseInt(c, 16));
    }

    const hexMatchShort = /^#?([\da-f])([\da-f])([\da-f])$/i.exec(color);
    if (hexMatchShort) {
        return hexMatchShort.splice(1).map((c) => Number.parseInt(c + c, 16));
    }

    if (color.includes(",")) {
        return color.split(",").map((p) => Number.parseInt(p));
    }

    throw new Error("Invalid color format! Use #ABC or #AABBCC or r,g,b");
}

function hexValue(components: number[]) {
    return (
        "#" +
        components.map((c) => `0${c.toString(16).toUpperCase()}`.slice(-2)).join("")
    );
}

function tint(components: number[], intensity: number) {
    return components.map((c) => Math.round(c + (255 - c) * intensity));
}

function shade(components: number[], intensity: number) {
    return components.map((c) => Math.round(c * intensity));
}

const withTint = (intensity: number) => (hex: number[]) =>
    tint(hex, intensity);

const withShade = (intensity: number) => (hex: number[]) =>
    shade(hex, intensity);


export const _variants = {
    50: withTint(0.95),
    100: withTint(0.9),
    200: withTint(0.75),
    300: withTint(0.6),
    400: withTint(0.3),
    500: (c: number[]) => c,
    600: withShade(0.9),
    700: withShade(0.6),
    800: withShade(0.45),
    900: withShade(0.3),
    950: withShade(0.2),
};

export function getColors(color: string, variants = _variants) {
    const colors: Record<string, string> = {};
    const components = parseColor(color);

    for (const [name, fn] of Object.entries(variants)) {
        colors[name] = hexValue(fn(components));
    }

    return colors;
}