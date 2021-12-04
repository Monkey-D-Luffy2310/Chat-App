import React from "react";
import { Row, Col, Button, Typography } from "antd";
import firebase, { auth } from "../../firebase/config";
import { addDocs } from "../../firebase/service";
import { generateKeywords } from "../../firebase/service";

const { Title } = Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function Login() {
  async function handleFbLogin() {
    await auth
      .signInWithPopup(fbProvider)
      .then(function (result) {
        const { additionalUserInfo, user } = result;
        if (additionalUserInfo?.isNewUser) {
          addDocs("users", {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
            providerID: additionalUserInfo.providerId,
            keywords: generateKeywords(user.displayName),
          });
        }
      })
      .catch(function (error) {
        console.log(error.message, 7000);
      });
  }
  async function handleGoogleLogin() {
    console.log(1);
    await auth
      .signInWithPopup(googleProvider)
      .then(function (result) {
        console.log(result);
        const { additionalUserInfo, user } = result;
        if (additionalUserInfo?.isNewUser) {
          addDocs("users", {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
            providerID: additionalUserInfo.providerId,
            keywords: generateKeywords(user.displayName),
          });
        }
      })
      .catch(function (error) {
        console.log(error.message, 7000);
      });
  }
  return (
    <div>
      <Row justify="center">
        <Col span={6}>
          <Title style={{ textAlign: "center" }} level={3}>
            Chat App
          </Title>
          <Button
            style={{ width: "100%", marginBottom: 8 }}
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFbLogin}>
            Sign in with FaceBook
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
