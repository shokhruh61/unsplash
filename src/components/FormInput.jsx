import { FaKey, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function FormInput({ type, placeholder, name }) {
  return (
    <label className="input-bordered input input-sm flex w-full items-center gap-2 md:input-md">
      <input
        type={type}
        className="grow"
        placeholder={placeholder}
        name={name}
      />
      {placeholder == "Full Name" && <FaUser className="h-4 w-4" />}
      {placeholder == "Email" && <MdEmail className="h-4 w-4" />}
      {placeholder == "Password" && <FaKey className="h-4 w-4" />}
      {placeholder == "Re Password" && <FaKey className="h-4 w-4" />}
    </label>
  );
}

export default FormInput;
