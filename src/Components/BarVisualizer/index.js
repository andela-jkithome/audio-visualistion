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
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, width, height);
    let barWidth = (width / audioData.length) * 2.5;
    let barHeight;
    let x = 0;
    for(const item of audioData) {
      barHeight = item/2;
      ctx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
      ctx.fillRect(x,height-barHeight/2,barWidth,barHeight);
      x += barWidth + 1;
    }
  }

  return (
    <canvas width="1000" height="500" ref={canvasRef} />
  )
}

export default AudioVisualiser;