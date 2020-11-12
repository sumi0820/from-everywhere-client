import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import "fullpage.js/vendors/scrolloverflow";
import { Link } from "react-router-dom";
import { Container, Grid, Button, Icon } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import "./styles/Landing.scss";

class Landing extends React.Component {
  onLeave(origin, destination, direction) {
    console.log("Leaving section " + origin.index);
  }
  afterLoad(origin, destination, direction) {
    console.log("After load: " + destination.index);
  }

  render() {
    return (
      <ReactFullpage
        scrollOverflow={true}
        sectionsColor={["white", "white", "white"]}
        onLeave={this.onLeave.bind(this)}
        afterLoad={this.afterLoad.bind(this)}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper">
              <div className="section section1">
                <Container>
                  <div className="sec1__container">
                    <h1 id='sec1__header'>from everywhere</h1>
                    <div className="sec1__content">
                      <Grid columns={2} container doubling stackable>
                        <Grid.Column
                          width={10}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <p id='sec1__header'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Facere, quis dicta ipsa ipsam omnis nesciunt
                            impedit quidem quibusdam est nemo? Natus, vel!
                            Accusantium rerum quaerat voluptate quo, quos porro
                            aperiam!
                          </p>
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <img
                            src="https://res.cloudinary.com/djct87vbj/image/upload/v1605094483/original_cb6fc0b556c5151ccb1480c27f96a81c_wcreh2.jpg"
                            alt="landing__img01"
                            
                          />
                        </Grid.Column>
                      </Grid>
                      <p className="sec1__content__mb">
                        You can start from everywhere.
                      </p>
                    </div>
                  </div>
                </Container>
              </div>
              <div className="section">
                <Container>
                  <div className="sec2__container">
                    <div className="sec2__content">
                      <Grid columns={2} container doubling stackable>
                        <Grid.Column width={9}>
                          <img
                            src="https://res.cloudinary.com/djct87vbj/image/upload/v1605097867/Snapseed_mewpfq.jpg"
                            alt="landing__img01"
                          />
                        </Grid.Column>
                        <Grid.Column
                          width={7}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            paddingTop: "100px",
                          }}
                          id="sec2__content__adjust"
                        >
                          <h2>
                            Your thing may help others, <br />
                            you may also be helped by others.
                          </h2>
                          <p>
                            from everywhere is inspired by a Japanese folk tale
                            called "The straw millionaire". <br />
                            Post your item that is not to be used anymore, and
                            exchange it with others. <br />
                            Keep exchanging, you may get something you have
                            never expected in the end.
                          </p>
                        </Grid.Column>
                      </Grid>
                      <div className="sec2__content__mb">
                        <h2>
                          Your thing may help others, <br />
                          you may also be helped by others.
                        </h2>
                        <p>
                          from everywhere is inspired by a Japanese folk tale
                          called "The straw millionaire". <br />
                          Post your item that is not to be used anymore, and
                          exchange it with others. <br />
                          Keep exchanging, you may get something you have never
                          expected in the end.
                        </p>
                        <img
                          src="https://res.cloudinary.com/djct87vbj/image/upload/v1605097867/Snapseed_mewpfq.jpg"
                          alt="landing__img01"
                          className="sec2__content__mb"
                        />
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
              <div className="section">
                <Container>
                  <Grid centered columns={1}>
                    <div className="sec3__container"></div>
                    <div className="slide sec3__content">
                      <img
                        src="./images/landing__02.svg"
                        alt="landing__img01"
                      />
                      <h3>Upload your item</h3>
                    </div>
                    <div className="slide sec3__content">
                      <img
                        src="./images/landing__03.svg"
                        alt="landing__img01"
                        style={{ height: "300px" }}
                      />
                      <h3>Find item</h3>
                    </div>
                    <div className="slide sec3__content">
                      <img
                        src="./images/landing__04.svg"
                        alt="landing__img01"
                      />
                      <h3>Send Message</h3>
                    </div>
                    <div className="slide sec3__content">
                      <img
                        src="./images/landing__05.svg"
                        alt="landing__img01"
                      />
                      <h3>Matching</h3>
                    </div>
                    <div className="slide sec3__content">
                      <img
                        src="./images/landing__06.svg"
                        alt="landing__img01"
                      />
                      <h3>Wait for the item</h3>
                    </div>
                  </Grid>
                </Container>
              </div>
              <div className="section">
                <Container>
                  <div className="sec4__container">
                    <div className="sec4__content">
                      <Grid columns={1} container doubling centered>
                        <Grid.Column textAlign="center">
                          <h1>Start from everywhere</h1>
                        </Grid.Column>
                        <div className="sec4__btns">
                          <Link to="/sign-up">
                            <Button
                              className="form__button goback"
                              animated
                              type="submit"
                              secondary
                            >
                              <Button.Content hidden>
                                <FontAwesomeIcon
                                  icon={faUserPlus}
                                  color="white"
                                />
                              </Button.Content>
                              <Button.Content visible>Sign up</Button.Content>
                            </Button>
                          </Link>
                          <Link to="/sign-in">
                            <Button
                              className="form__button goback"
                              animated
                              type="submit"
                              secondary
                            >
                              <Button.Content hidden>
                                <Icon name="sign-in" />
                              </Button.Content>
                              <Button.Content visible>Sign in</Button.Content>
                            </Button>
                          </Link>
                        </div>
                      </Grid>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          );
        }}
      />
    );
  }
}

export default Landing;
