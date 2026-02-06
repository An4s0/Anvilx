export type Error = {
  message: string;
  statusCode: number;
};

export function normalizeErrors<e extends Record<string, Error>>(errors: e) {
  const result = {} as {
    [c in keyof e]: {
      code: c;
      message: e[c]["message"];
      statusCode: e[c]["statusCode"];
    };
  };

  for (const key in errors) {
    result[key] = {
      code: key,
      message: errors[key].message,
      statusCode: errors[key].statusCode,
    };
  }

  return result;
}
