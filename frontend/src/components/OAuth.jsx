import { Button } from "flowbite-react"
import { AiFillGoogleCircle } from "react-icons/ai"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import app from "../firebase"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../redux/user/userSlice.js"
import { useNavigate } from "react-router-dom"


const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleGoogleClick = async () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({prompt: 'select_account'});


      // Sign in with popup:
      try {
        const resultsFromGoogle = await signInWithPopup(auth, provider);

        //Only proceed to fetch data after the sign-in is successful; 
        const res = await  fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: resultsFromGoogle.user.displayName,
            email: resultsFromGoogle.user.email,
            googlePhotoURL: resultsFromGoogle.user.photoURL,
            
          }),
        })
        console.log(res)
        const data = await res.json()
        if(res.ok){
          dispatch(signInSuccess(data));
          // Only navigate after sign-in is successful. 
          navigate('/');
        }
      } catch (error) {
        console.log(error)
      }

  };

  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline
    onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
      Continue with Google
    </Button>
  )
}

export default OAuth
