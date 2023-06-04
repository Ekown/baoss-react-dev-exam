import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.min.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import { useRef } from "react";
import { Form } from "react-bootstrap";
import "./TypeaheadInput.css";

const TypeaheadInput = ({ options, searchText, setSearchText, addToCart }) => {
  const ref = useRef(null);

  /*
   I decided to remove the "Add" button and opt to automatically add the Product
   when the user selects from the dropdown which seems more intuitive to me
  */
  return (
    <div className="typeahead-input">
      <Form>
        <Form.Group>
          <Form.Label htmlFor="basic-typeahead-single">Product</Form.Label>
          <Typeahead
            ref={ref}
            role="combobox"
            id="basic-typeahead-single"
            labelKey="name"
            options={options}
            onChange={(selected) => {
              if (selected[0]) {
                addToCart(selected[0]);

                ref.current.clear();
              }
            }}
            placeholder="Search fruits..."
            aria-label="Search fruits"
            aria-autocomplete="list"
            aria-expanded={options.length > 0}
            aria-owns="basic-typeahead-single"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default TypeaheadInput;
