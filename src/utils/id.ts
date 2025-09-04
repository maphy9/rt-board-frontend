let uniqueValue = 0;

export default function getID(): string {
  return `${Date.now()}-${uniqueValue++}`;
}
