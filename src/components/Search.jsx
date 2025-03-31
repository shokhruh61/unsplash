import { Form } from "react-router-dom";
import { FormInput } from "./";
function Search() {
  return (
    <Form method="post" className="flex w-full max-w-96 items-center gap-2">
      <FormInput type="text" placeholder="search" name="search" />
      <button className="btn btn-primary btn-sm md:hidden">Search</button>
    </Form>
  );
}

export default Search;
