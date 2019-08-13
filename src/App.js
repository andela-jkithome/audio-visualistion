import React, { useState } from 'react';
import {
  Container,
  Menu,
  Grid,
  Button,
  Icon
} from 'semantic-ui-react'
import './App.css';

const App = () => {
  const [recording, setRecording] = useState(false);

  const toggleRecording = () => {
    setRecording(!recording);
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
              {recording ? 'Stop' : 'Record'}
            </Button>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
export default App;
