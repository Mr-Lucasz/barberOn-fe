import propTypes from 'prop-types';

export function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div>
            {children}
          </div>
        )}
      </div>
    );
  }

CustomTabPanel.propTypes = {
    children: propTypes.node,
    index: propTypes.number.isRequired,
    value: propTypes.number.isRequired,
  };