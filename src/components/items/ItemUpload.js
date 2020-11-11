import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  Form,
  Icon,
  TextArea,
  Input,
} from "semantic-ui-react";
import "../styles/Items.scss";

const ItemUpload = ({
  loggedInUser,
  onCreateItem,
  onEditItem,
  onDeleteItem,
  onGoBack,
}) => {
  // const [userItem, setUserItem] = useState(null);
  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/item/${loggedInUser.item}`, { withCredentials: true })
  //     .then((response) => {
  //       setUserItem(response.data);
  //     });
  // }, []);
  if (!loggedInUser) {
    return <Redirect to={"/sign-in"} />;
  }
  return (
    <div>
      {/* <form onSubmit={!loggedInUser.item ? onCreateItem : onEditItem}>
        <input
          type="text"
          name="name"
          defaultValue={loggedInUser.item ? loggedInUser.item.name : null}
        />
        <textarea
          type="text"
          name="description"
          defaultValue={
            loggedInUser.item ? loggedInUser.item.description : null
          }
        />
        <input
          type="text"
          name="condition"
          defaultValue={loggedInUser.item ? loggedInUser.item.condition : null}
        />

        <input
          type="text"
          name="image"
          defaultValue={loggedInUser.item ? loggedInUser.item.image : null}
        />
        <button type="submit">
          {!loggedInUser.item ? <p>Upload</p> : <p>Edit</p>}
        </button>
      </form> */}

      <div className="form__container">
        <Container text>
          <Grid container>
            <Grid.Column>
              <Form
                onSubmit={!loggedInUser.item ? onCreateItem : onEditItem}
                className="form__form"
              >
                <Form.Field required>
                  <label>Item Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={
                      loggedInUser.item ? loggedInUser.item.name : null
                    }
                  />
                </Form.Field>

                <Form.Field>
                  <label>Description</label>
                  <TextArea
                    type="text"
                    name="description"
                    defaultValue={
                      loggedInUser.item ? loggedInUser.item.description : null
                    }
                  />
                </Form.Field>

                <label>Condition</label>

                <Form.Field
                  placeholder="Select item's condition"
                  control="select"
                  name="condition"
                >
                  <option value="Very good">Very good</option>
                  <option value="Normal">Normal</option>
                  <option value="So so">So so</option>
                  <option value="Damaged">Damaged</option>
                </Form.Field>

                <Form.Field>
                  <label>Item Image</label>
                  <Input type="file" name="image" />
                </Form.Field>

                <div className="itemDetail__btn profile__btn__container">
                  <Button
                    className="form__button goback "
                    animated
                    type="submit"
                    secondary
                  >
                    <Button.Content hidden>
                      <Icon name="edit outline" />
                    </Button.Content>
                    <Button.Content visible>Update</Button.Content>
                  </Button>
                </div>
              </Form>
              <div className="form__testMode__container goback">
                <Button
                  className="profile__inbox goback"
                  animated
                  secondary
                  onClick={() => {
                    onGoBack();
                  }}
                >
                  <Button.Content hidden>
                    <Icon name="hand point left outline large" />
                  </Button.Content>
                  <Button.Content visible>Go Back</Button.Content>
                </Button>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </div>

      {loggedInUser.item ? (
        <>
          <button
            onClick={() => {
              onDeleteItem(loggedInUser.item._id);
            }}
          >
            <p>Delete</p>
          </button>
        </>
      ) : null}

      <Link to={`/user/${loggedInUser}`}>X</Link>
    </div>
  );
};

export default ItemUpload;
