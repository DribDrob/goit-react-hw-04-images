import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const schema = yup.object().shape({
  query: yup.string().required(),
});

const initialValues = {
  query: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <header class="searchbar">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form class="form">
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <Field
            class="input"
            type="text"
            autocomplete="off"
            autofocus
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
