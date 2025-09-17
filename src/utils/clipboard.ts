export async function copyObjectToClipboard(data) {
  const payload = JSON.stringify({
    __customType: "boardObjects",
    data,
  });

  await navigator.clipboard.writeText(payload);
}
