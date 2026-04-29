const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const publicDir = path.join(__dirname, '../public');
const files = ['reel1.mp4', 'reel2.mp4', 'reel3.mp4', 'reel4.mp4'];

async function compressFile(file) {
  const inputPath = path.join(publicDir, file);
  const tempPath = path.join(publicDir, `temp_${file}`);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`File not found: ${inputPath}`);
    return;
  }

  console.log(`Compressing ${file}...`);
  
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-vcodec libx264',
        '-crf 28',
        '-preset fast'
      ])
      .save(tempPath)
      .on('end', () => {
        console.log(`Finished compressing ${file}`);
        // Verify size
        const oldSize = fs.statSync(inputPath).size;
        const newSize = fs.statSync(tempPath).size;
        console.log(`Original size: ${(oldSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Compressed size: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
        
        if (newSize < oldSize) {
          // Replace original
          fs.unlinkSync(inputPath);
          fs.renameSync(tempPath, inputPath);
          console.log(`Replaced original with compressed version.`);
        } else {
          console.log(`Compressed version is not smaller (${(newSize / 1024 / 1024).toFixed(2)} MB vs ${(oldSize / 1024 / 1024).toFixed(2)} MB). Keeping original.`);
          fs.unlinkSync(tempPath);
        }
        resolve();
      })
      .on('error', (err) => {
        console.error(`Error compressing ${file}:`, err);
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
        reject(err);
      });
  });
}

async function run() {
  for (const file of files) {
    try {
      await compressFile(file);
    } catch (e) {
      console.error(`Failed to compress ${file}`);
    }
  }
}

run();
