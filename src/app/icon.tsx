import { ImageResponse } from 'next/og';
import * as fs from 'fs';
import * as path from 'path';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default async function Icon() {
  // Read the image using absolute path
  const imagePath = path.join(process.cwd(), 'public', 'favicon.png');
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px', // Optional: adds a slight curve if desired, but 0 is fine
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={base64Image} width="80%" height="80%" style={{ objectFit: 'contain' }} alt="favicon" />
      </div>
    ),
    {
      ...size,
    }
  );
}
