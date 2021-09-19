export function createErrorResponse(...errors: string[]) {
  return errors.map(e => ({
    type: e
  }));
}
