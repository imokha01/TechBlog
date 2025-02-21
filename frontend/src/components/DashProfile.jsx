import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { HiMail } from "react-icons/hi";

const DashProfile = () => {
  const { currentUser } = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData,  setFormData] = useState({});

  //TODO: Create a file picker reference  
  const filePickerRef = useRef();

  const handleImageChange = e => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }), [imageFile];

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);  //FIXME: Append the image file of the form data
  };

  return (
    <div className="w-full max-w-lg p-3 mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          aria-label=""
          accept="image/*"
          onClick={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="self-center w-32 h-32 overflow-hidden rounded-full shadow-md cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          addon="@"
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          icon={HiMail}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="flex justify-between mt-5 text-red-500">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
