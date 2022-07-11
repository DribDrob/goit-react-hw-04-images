import { Grid } from 'react-loader-spinner';
import 'styles.css';

export const Loader = () => {
  return (
    <div className="Loader">
      <Grid
        ariaLabel="loading-indicator"
        visible={true}
        color="#3f51b599"
        height="50"
        width="50"
      />
    </div>
  );
};
