export default function useGlobalHooks() {
  const stopPropagation = (event) => event.stopPropagation();

  return {
    stopPropagation,
  };
}
