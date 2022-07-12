import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import 'styles.css';

const schema = yup.object().shape({
  query: yup.string(),
});

const initialValues = {
  query: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ query }, { resetForm }) => {
    if (query.trim() === '') {
      toast.error('Please, enter the search query.');
      return;
    }
    onSubmit(query);
    resetForm();
  };

  return (
    <header className="Searchbar">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className="SearchForm ">
          <button type="submit" className="SearchForm-button">
            <FaSearch size={16} />
            <span className="SearchForm-button-label">Search</span>
          </button>

          <Field
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
          />
          <ErrorMessage name="query" />
        </Form>
      </Formik>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
