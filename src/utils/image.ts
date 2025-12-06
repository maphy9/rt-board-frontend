import Size from "@/types/size";

const getMeta = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;
  });

export async function getImageSize(src): Promise<Size> {
  const meta = (await getMeta(src)) as any;
  return { width: meta.naturalWidth, height: meta.naturalHeight };
}

export function imageDataToBase64(data: Blob | File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(data);
  });
}
