import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { HiMail } from "react-icons/hi";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";



const SignIn = () => {
  // create an initial state for the input data
  const [formData, setFormData] = useState({});

  // Create a handleChange function to Update the formData using the id property.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // // create a state for error messages
  // const [errorMessage, setErrorMessage] = useState(null);

  // // create a loading state for the form submission
  // const [loading, setLoading] = useState(false);

  // Get the user state from the Redux store
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  // create a dispatch state for the Redux store
  const dispatch = useDispatch();

  // create a navigation state for the form submission
  const navigate = useNavigate();

  //! Create the function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields."));
    }
    // TODO: Send the form data to the server using axios or fetch API
    try {
      // //? 1. start loading state
      //  setLoading(true);
      // setErrorMessage(null); 

      dispatch(signInStart()); //? 2. start loading state

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message)); 
      }
      // setLoading(false); // stop loading state
      if (res.ok) {
        dispatch(signInSuccess(data)); 
        navigate("/"); // redirect to the Home page
      }
    } catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false); // stop loading state

      dispatch(signInFailure(error.message)); 
    }
  };
  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/***** LEFT SIDE *****/}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              TechGuru
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Welcome to TechBlog. You can signin with email and password or with
            Google
          </p>
        </div>

        {/*****  RIGHT SIDE *****/}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                icon={HiMail}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="***********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-sm text-blue-500">
              {" "}
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" type="error" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
