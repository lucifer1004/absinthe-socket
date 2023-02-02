import { GqlOperationType } from "./types";

const operationTypeRegex = /^\s*(query|mutation|subscription|\{)/;

const getOperationTypeFromMatched = (matched: string): GqlOperationType =>
  matched === "{" ? GqlOperationType.Query : (matched as GqlOperationType);

export const getOperationType = (operation: string): GqlOperationType => {
  const result = operation.match(operationTypeRegex);
  if (!result) {
    throw new TypeError("Invalid operation:\n${operation}");
  }

  return getOperationTypeFromMatched(result[1]);
};
