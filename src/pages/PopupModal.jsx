import React from "react";

const PopupModal = ({ open, name }) => {
  if (!open) return null;
  return (
    <div className="overlay">
      <div className="modalContainer cursor-pointer">
        <div className="modalRight">
          <p className="closeBtn">X</p>
          <div className="content">
            <p className="p-1 text-2xl font-semibold sm:text-3xl">Hey {name}</p>
            <h1 className="p-2 text-3xl font-extrabold text-purple-500 sm:text-5xl">
              Congratulations!
            </h1>
            <p className="p-2 text-xl">
              You have successfully submitted the form.
            </p>
            
            <p className="p-1 text-lg">
              Wait, you are being redirected to the profile page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
