import { useState, useRef, useEffect } from 'react';
import { SketchPicker, ColorResult, RGBColor } from 'react-color';
import { useFormikContext } from 'formik';

const LIGHT_COLORS = [
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
];

const DARK_COLORS = [
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

const MID_COLORS = ['#a0aec0', '#81e6d9', '#f6ad55', '#90cdf4', '#cbd5e0'];

type ComponentPropsType = {
  fieldname: string;
};

// Helper to convert stored color to CSS rgba string
export function getRGBAString(color: RGBColor | string) {
  if (typeof color === 'string') return color;
  const { r, g, b, a } = color;
  return `rgba(${r}, ${g}, ${b}, ${a ?? 1})`;
}

function ColorField({ fieldname }: ComponentPropsType) {
  const { setFieldValue, values } = useFormikContext<any>();
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const swatchRef = useRef<HTMLDivElement>(null);

  // Get current color value with rgba fallback
  const currentColor =
    values?.[fieldname]?.r !== undefined ? values?.[fieldname] : values?.[fieldname] || '#3498db';

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
            presetColors={[...LIGHT_COLORS, ...MID_COLORS, ...DARK_COLORS]}
            onChange={(updatedColor: ColorResult) => setFieldValue(fieldname, updatedColor.rgb)}
          />
        </div>
      )}
    </div>
  );
}

export default ColorField;
