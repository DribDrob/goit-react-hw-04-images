import 'styles.css';
import PropTypes from 'prop-types';

export const Button = ({ children, onClick }) => {
  return (
    <button className="Button" type="button" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
