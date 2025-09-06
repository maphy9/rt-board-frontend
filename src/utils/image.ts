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
