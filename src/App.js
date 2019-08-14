import React, { useState } from 'react';
import {
  Container,
  Menu,
  Grid,
  Button,
  Icon
} from 'semantic-ui-react'
import './App.css';
import AudioAnalyser from './Components/Analyser';

const App = () => {
  const [recording, setRecording] = useState(false);
  const [audio, setAudio] = useState(null);

  const toggleRecording = () => {
    if(audio) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  const startRecording = async () => {
    const recording = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    setAudio(recording);
    setRecording(true);
  }

  const stopRecording = () => {
    audio.getTracks().forEach(track => track.stop());
    setAudio(null);
    setRecording(false);
  }

  return (
    <div className="App">
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            Audio Visualisation With React
          </Menu.Item>
        </Container>
      </Menu>
      <Container style={{ marginTop: '7em' }}>
        <Grid verticalAlign='middle' centered columns={2}>
          <Grid.Column style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color={recording ? 'red' : 'green'}
              icon
              labelPosition='left'
              onClick={toggleRecording}
            >
              <Icon name={recording ? 'stop' : 'play'} />
              {recording ? 'Stop Recording Audio' : 'Record Audio'}
            </Button>
          </Grid.Column>
        </Grid>
      </Container>
      <Container style={{ marginTop: '7em' }}>
        {audio ? <AudioAnalyser audio={audio} /> : ''}
      </Container>
    </div>
  );
}
export default App;
