import React from "react";

import ThreeDotsImage from "assets/images/3-dot-icon.jpg";

import "./MusicItem.scss";
import Dropdown from "components/Dropdown";

class MusicItem extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }
  state = {
    showDropdown: false
  };
  toggleDropdownMenu = e => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };
  handleClickOutside = e => {
    if (this.container.current && !this.container.current.contains(e.target)) {
      this.setState({
        showDropdown: false
      });
    }
  };
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const { id, title, artist, videoId, star, onPlay, onDelete } = this.props;
    const { toggleDropdownMenu } = this;
    const { showDropdown } = this.state;
    const url = `http://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // iframe: https://www.youtube.com/embed/${videoId}

    return (
      <div id="musicitem-container">
        <div className="thumbnail-wrapper" ref={this.container}>
          <div className="musicitem-thumbnail">
            <img src={url} onClick={e => onPlay(e, id)} />
          </div>
          <div className="dropdown-options" onClick={toggleDropdownMenu}>
            <img src={ThreeDotsImage} alt="options" />
          </div>
          <Dropdown show={showDropdown} onDelete={onDelete} id={id} />
        </div>

        <div className="title-text">
          {title} - {artist}
        </div>
      </div>
    );
  }
}

export default MusicItem;
