import React from "react";

import "./Input.scss";

class Input extends React.PureComponent {
  render() {
    const { name, value, placeholder, onChange, onKeyPress } = this.props;
    console.log(`input ${name} render...`);

    return (
      <div className="input-wrap">
        <input
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  }
}

export default Input;
