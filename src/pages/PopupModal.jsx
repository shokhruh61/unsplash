import React from "react";

const PopupModal = ({ open, name }) => {
  if (!open) return true;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-80 rounded-lg bg-white p-6 text-center shadow-lg">
        <button className="absolute right-2 top-2 text-lg">X</button>
        <p className="text-2xl font-semibold">Hey {name}</p>
        <h1 className="text-3xl font-bold text-purple-500">Congratulations!</h1>
        <p className="mt-2 text-lg">
          You have successfully submitted the form.
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Wait, you are being redirected to the profile page.
        </p>
      </div>
    </div>
  );
};

export default PopupModal;
