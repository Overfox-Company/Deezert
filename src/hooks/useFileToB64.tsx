export const readFileAsBase64 = (file: any) => {
  return new Promise<{ path: string, format: string,name:string}>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      const format = file.name.split('.').pop() || ''; // Obtener la extensión del archivo
      resolve({ path: base64Data, format: format ,name:file.name});
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};