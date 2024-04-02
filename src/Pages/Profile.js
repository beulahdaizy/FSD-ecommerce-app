import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { auth, storage } from "../firebase-config";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import "../styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setDisplayName(user.displayName || "");
        setEmail(user.email || "");
        setPhotoURL(user.photoURL || "");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, { displayName, email });
      if (photoFile) {
        await uploadProfilePhoto(photoFile);
      }
      toast.success("Profile updated successfully");
      setEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const uploadProfilePhoto = async (file) => {
    const storageRef = ref(storage, `profile-images/${auth.currentUser.uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    await updateProfile(auth.currentUser, { photoURL: downloadURL });
  };

  return (
    <section>
      <Container>
        ''
        <Row>
          <Col lg="6" className="m-auto text-center">
            <h3 className="fw-bold mb-4">Profile</h3>
            {user ? (
              <div>
                {editing ? (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Display Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Display Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {photoURL && (
                        <img
                          src={photoURL}
                          alt="Profile"
                          style={{
                            width: "100px",
                            height: "100px",
                            marginTop: "10px",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </FormGroup>
                    <button type="submit">Save</button>
                  </Form>
                ) : (
                  <div>
                    <p>
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="profile-image"
                      />
                    </p>
                    <p>Name: {user.displayName}</p>
                    <p>Email: {user.email}</p>

                    <button onClick={() => setEditing(true)}>
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p>Please sign in to view your profile.</p>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
