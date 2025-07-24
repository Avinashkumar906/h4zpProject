import * as Yup from 'yup';

type FieldConfig = {
  name: string;
  type: string;
  options?: any[];
  required?: boolean;
  fields?: FieldConfig[];
};

/**
 * Determines base Yup type based on field type.
 */
const getYupBaseType = (type: string, options?: any[]): Yup.AnySchema => {
  switch (type) {
    case 'select':
      return Yup.string().oneOf(options?.map((o) => o.value) || []);
    case 'text':
    case 'rte':
    case 'color':
    case 'upload':
      return Yup.string();
    case 'checkbox':
      return Yup.boolean();
    case 'number':
      return Yup.number();
    default:
      return Yup.mixed(); // fallback
  }
};

/**
 * Recursively generates a Yup schema from the field config,
 * validating only keys that are present in the form values.
 */
export const generateYupSchemaFromConfig = (
  fields: FieldConfig[],
  values: Record<string, any>
): Yup.ObjectSchema<any> => {
  const shape: Record<string, Yup.AnySchema> = {};

  fields.forEach((field) => {
    const { name, type, options, required } = field;
    if (!(name in values)) return;

    const value = values[name];

    // 🧩 GROUP TYPE (object)
    if (type === 'group' && typeof value === 'object' && !Array.isArray(value)) {
      shape[name] = Yup.object(
        generateYupSchemaFromConfig(options || [], value).fields
      );
      return;
    }

    // 🧩 ARRAY OF OBJECTS
    if (Array.isArray(value) && Array.isArray(options)) {
      const firstItem = value[0] || {};
      shape[name] = Yup.array().of(
        Yup.object(generateYupSchemaFromConfig(options, firstItem).fields)
      );
      return;
    }

    // 🔠 BASE FIELD
    let baseSchema = getYupBaseType(type, options);
    if (required) baseSchema = baseSchema.required('This field is required');
    shape[name] = baseSchema;
  });

  return Yup.object().shape(shape);
};
