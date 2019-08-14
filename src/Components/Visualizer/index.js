import React, { useRef, useEffect } from 'react';

const AudioVisualiser = ({ audioData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    draw();
  });

  const draw = () => {
    const canvas = canvasRef.current;
    const height = canvas.height;
    const width = canvas.width;
    const ctx = canvas.getContext('2d');
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.length;
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    for (const item of audioData) {
      const y = (item / 255.0) * height;
      ctx.lineTo(x, y);
      x += sliceWidth;
    }
    ctx.lineTo(x, height / 2);
    ctx.stroke();
  }

  return (
    <canvas width="1000" height="500" ref={canvasRef} />
  )
}

export default AudioVisualiser;