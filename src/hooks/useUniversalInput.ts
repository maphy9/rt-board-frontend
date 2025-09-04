export default function useUniversalInput() {
  const stopPropagation = (event) => event.stopPropagation();

  return {
    stopPropagation,
  };
}
