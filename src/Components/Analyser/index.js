import React, { useState, useEffect, useRef } from 'react';
import AudioVisualiser from '../Visualizer';
import BarAudioVisualizer from '../BarVisualizer';

const AudioAnalyser = ({ audio }) => {
  const audioContext = useRef(null);
  const analyser = useRef(null);
  const dataArray = useRef(null);
  const source = useRef(null);
  const rafId = useRef(null)

  const [audioData, setAudioData] = useState(new Uint8Array(0));

  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    analyser.current = audioContext.current.createAnalyser();
    // analyser.current.fftSize = 256; //Use with Bar graph visualizer
    dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);
    source.current = audioContext.current.createMediaStreamSource(audio);
    source.current.connect(analyser.current);
    rafId.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId.current);
      analyser.current.disconnect();
      source.current.disconnect();
    };
  },[]);

  const tick = () => {
    analyser.current.getByteTimeDomainData(dataArray.current);
    setAudioData([...dataArray.current]);
    rafId.current = requestAnimationFrame(tick);
  }

  return (
    <AudioVisualiser audioData={audioData} />
  )
}

export default AudioAnalyser;
