import { VFC } from 'react';

import { Button, Container, Grid } from 'semantic-ui-react';

const GoBackBtn: VFC = () => (
  <Container>
    <Grid columns={1} ui centered grid stackable>
      <Grid.Row>
        <div>
          <Button
            secondary
            onClick={() => {
              // onGoBack();
              console.log('onGoBack');
            }}
          >
            <Button.Content visible>Go Back</Button.Content>
          </Button>
        </div>
      </Grid.Row>
    </Grid>
  </Container>
);

export default GoBackBtn;
