import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBuAUeTnJbqbs-SNa1fh2QcaLaEwQkLYQ8",
  authDomain: "paymates-7b09f.firebaseapp.com",
  projectId: "paymates-7b09f",
  storageBucket: "paymates-7b09f.appspot.com",
  messagingSenderId: "56379249650",
  appId: "1:56379249650:web:acdb7a74b3d42a922d516b"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">{user ? <SendInvites user={user} /> : <SignUp />}</header>
    </div>
  );
}

function SignUp() {
  const [recaptcha, setRecaptcha] = useState(null);
  const element = useRef(null);

  useEffect(() => {
    if (!recaptcha) {
      const verifier = new firebase.auth.RecaptchaVerifier(element.current, {
        size: 'invisible',
      })
      verifier.verify().then(() => setRecaptcha(verifier));
    }
  });
  return (
    <>
      {recaptcha && <PhoneNumberVerification recaptcha={recaptcha} />}
      <div ref={element}></div>
    </>
  );
}

function PhoneNumberVerification({ recaptcha }) {
  const [digits, setDigits] = useState('');
  const [invited, setInvited] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [code, setCode] = useState('');

  const phoneNumber = `+1${digits}`;

  // Step 1 - Verify Invite
  useEffect(() => {
    if (phoneNumber.length === 12) {
      setInvited(true);
    } else {
      setInvited(false);
    }
  }, [phoneNumber]);

  // Step 2 - Sign in
  const signInWithPhoneNumber = async () => {
    setConfirmationResult( await auth.signInWithPhoneNumber(phoneNumber, recaptcha) );
  };

  // Step 3 - Verify SMS code
  const verifyCode = async () => {
    const result = await confirmationResult.confirm(code);
    console.log(result.user);
  };

  return (
    <div>
      <h1>Sign Up!</h1>
      <fieldset>
        <label>10 digit US phone number</label>
        <br />
        <input value={digits} onChange={(e) => setDigits(e.target.value)} />

        <button className={!invited ? 'hide' : ''} onClick={signInWithPhoneNumber}>
          Sign In
        </button>

        {invited ? 
          <p className="success">You are one of the cool kids! 👋</p> : 
          <p className="danger">This phone number is not cool 😞</p>
          
        }  
      </fieldset>

      {confirmationResult && (
        <fieldset>
          <label>Verify code</label>
          <br />
          <input value={code} onChange={(e) => setCode(e.target.value)} />

          <button onClick={verifyCode}>Verify Code</button>
        </fieldset>
      )}
    </div>
  );
}

function SendInvites({ user }) {


  return (
    <div>
      <h1>logged in</h1>
      <h1>{user.uid}</h1>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}

export default App;