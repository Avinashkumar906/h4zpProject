import { useState, useRef, useEffect } from 'react';
import { SketchPicker, ColorResult, RGBColor } from 'react-color';
import { useFormikContext } from 'formik';

const COLOR_PALETTE = [
  // Light
  '#ffffff',
  '#f8f9fa',
  '#e9ecef',
  '#dee2e6',
  '#fdf6e3',
  '#f0f4f8',
  '#fff3cd',
  '#e6f7ff',
  '#e8f5e9',
  '#fce4ec',

  // Mid
  '#a0aec0',
  '#81e6d9',
  '#f6ad55',
  '#90cdf4',
  '#cbd5e0',

  // Additional Accents
  '#ff6b6b',
  '#48bb78',
  '#4299e1',
  '#ed64a6',
  '#ecc94b',
  '#9f7aea',
  '#38b2ac',

  // Dark
  '#212529',
  '#343a40',
  '#000000',
  '#1c1c1c',
  '#2c2f33',
  '#23272a',
  '#0d1117',
  '#1e1e1e',
  '#121212',
  '#3a3b3c',
];

type componentPropsType = {
  fieldname: string;
};

// Helper to convert stored color to CSS rgba string
export function getRGBAString(color: RGBColor | string | undefined) {
  if (!color) return ''; // or return a default like 'rgba(0,0,0,1)'
  if (typeof color === 'string') return color;

  const { r, g, b, a } = color;
  return `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;
}

export function parseColorString(color: string | undefined): RGBColor | undefined {
  if (!color) return undefined;

  // If already rgba
  const rgbaMatch = color.match(/^rgba?\((\d+), ?(\d+), ?(\d+)(?:, ?([0-9.]+))?\)$/);
  if (rgbaMatch) {
    const [, r, g, b, a] = rgbaMatch;
    return {
      r: parseInt(r, 10),
      g: parseInt(g, 10),
      b: parseInt(b, 10),
      a: a !== undefined ? parseFloat(a) : 1,
    };
  }

  // Handle hex values like "#fff" or "#ffffff"
  const hex = color.replace('#', '');
  let r = 0,
    g = 0,
    b = 0;

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    return undefined;
  }

  return { r, g, b, a: 1 };
}

const ColorField = ({ fieldname = '#ffffff' }: componentPropsType) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const swatchRef = useRef<HTMLDivElement>(null);
  const [currentColor, setCurrentColor] = useState(parseColorString(values[fieldname]));

  // Close picker on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node) &&
        swatchRef.current &&
        !swatchRef.current.contains(e.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="d-flex justify-content-between align-items-center position-relative">
      <span>Pick a Color</span>

      {/* Swatch to open picker */}
      <div
        ref={swatchRef}
        onClick={() => setShowPicker((prev) => !prev)}
        style={{
          backgroundColor: getRGBAString(currentColor),
          width: '40px',
          height: '20px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      />

      {/* Picker popup */}
      {showPicker && (
        <div
          ref={pickerRef}
          style={{
            position: 'absolute',
            zIndex: 200,
            top: '32px',
            right: 0,
          }}
        >
          <SketchPicker
            color={currentColor}
            presetColors={[...COLOR_PALETTE]}
            onChange={(c: ColorResult) => {
              setCurrentColor(c.rgb);
              setFieldValue(fieldname, getRGBAString(c.rgb));
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ColorField;
