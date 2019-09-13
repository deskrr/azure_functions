export function validateObject(
  obj,
  rules: ValidationRule
): ValidateRequestResponse {
  if (!obj) {
    return {
      isValid: false,
      msg: "null_obj"
    }
  }
  for (const field in rules) {
    const rule = rules[field];
    if (rule.reqd && !obj[field]) {
      return {
        isValid: false,
        msg: `${field} is a required field`
      };
    }
  }
  return { isValid: true };
}

export interface ValidateRequestResponse {
  isValid: boolean;
  msg?: string;
}

interface ValidationRule {
  [x: string]: {
    reqd: boolean;
    type: "string" | number | string[];
  };
}
