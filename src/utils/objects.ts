function shallowEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a == null ||
    b == null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (a[key] !== b[key]) return false;
  }

  return true;
}

export function getDifferentFields(o1: any, o2: any): string[] {
  const diffs: string[] = [];
  const keys = Array.from(
    new Set([...Object.keys(o1 || {}), ...Object.keys(o2 || {})])
  );

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!shallowEqual(o1?.[key], o2?.[key])) {
      diffs.push(key);
    }
  }

  return diffs;
}
