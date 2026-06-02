import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = __dirname;
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

// Import sharp
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (e) {
  console.error("❌ Error: 'sharp' no está instalado.");
  console.error("Por favor, ejecuta el siguiente comando primero:");
  console.error("pnpm add -D sharp");
  process.exit(1);
}

// 1. Obtener todas las imágenes recursivamente en el directorio public
const getFiles = (dir, extArray, fileList = []) => {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, extArray, fileList);
    } else {
      if (extArray.includes(path.extname(file).toLowerCase())) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
};

const images = getFiles(PUBLIC_DIR, ['.jpg', '.jpeg', '.png']);
console.log(`📸 Se encontraron ${images.length} imágenes para convertir.`);

for (const imgPath of images) {
  const ext = path.extname(imgPath);
  const webpPath = imgPath.slice(0, -ext.length) + '.webp';
  
  try {
    console.log(`⏳ Convirtiendo ${path.basename(imgPath)} a .webp...`);
    await sharp(imgPath).webp({ quality: 80 }).toFile(webpPath);
    
    // Opcional: Eliminar la imagen original después de convertirla
    fs.unlinkSync(imgPath);
    console.log(`✅ ${path.basename(imgPath)} convertida y original eliminada.`);
  } catch (err) {
    console.error(`❌ Error convirtiendo ${path.basename(imgPath)}:`, err);
  }
}

// 2. Reemplazar las referencias de .png y .jpg en el código fuente
const replaceInFiles = (dir, extArray) => {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      replaceInFiles(filePath, extArray);
    } else {
      if (extArray.includes(path.extname(file).toLowerCase())) {
        let content = fs.readFileSync(filePath, 'utf-8');
        const originalContent = content;
        
        // Expresión regular para reemplazar extensiones asegurando que son imágenes
        content = content.replace(/\.png/gi, '.webp');
        content = content.replace(/\.jpg/gi, '.webp');
        content = content.replace(/\.jpeg/gi, '.webp');
        
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content, 'utf-8');
          console.log(`🔄 Actualizadas referencias en: ${path.relative(ROOT_DIR, filePath)}`);
        }
      }
    }
  }
};

console.log("\n🔍 Buscando referencias de imágenes en el código para actualizarlas...");
const codeDirs = [
  path.join(ROOT_DIR, 'app'), 
  path.join(ROOT_DIR, 'components'), 
  path.join(ROOT_DIR, 'lib')
];

for (const dir of codeDirs) {
  replaceInFiles(dir, ['.tsx', '.ts', '.jsx', '.js', '.css']);
}

console.log("\n🎉 ¡Proceso completado exitosamente!");
