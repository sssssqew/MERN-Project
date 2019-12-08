import React from "react";

import ThreeDotsImage from "assets/images/3-dot-icon.jpg";

import "./MusicItem.scss";
import Dropdown from "components/Dropdown";

// 배열의 map 메서드로 맵핑된 MusicItem 컴포넌트는
// 해당 컴포넌트의 상태 변경시 전체 MuiscItem 컴포넌트들이 아니라
// 해당 컴포넌트만 렌더링하도록 PureComponent로 변경함
// PureComponent는 자체적으로 shouldUpdateComponent 가 내장되어 있음
// Input 컴포넌트들도 PureComponent로 변경하여 해당 컴포넌트만 렌더링하도록 함

// PureComponent는 전달되는 props가 모두 불변적이어야 함
// 불변적이라는 말은 배열이나 객체를 props에 하드코딩으로 전달하면 안됨
// 그러면 매번 새로운 배열이나 객체가 전달되기 때문에
// 어차피 props를 내부적으로 비교해도 렌더링이 되기 때문에
// 비교하는 코드 때문에 렌더링만 늦어짐

class MusicItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }
  state = {
    showDropdown: false,
    menu: ["edit", "delete"]
  };
  toggleDropdownMenu = e => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };
  handleClickOutside = e => {
    const { showDropdown } = this.state;
    if (
      this.container.current &&
      !this.container.current.contains(e.target) &&
      showDropdown
    ) {
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
    const { id, title, artist, videoId, star, onPlay, onShow } = this.props;
    const { toggleDropdownMenu } = this;
    const { showDropdown, menu } = this.state;
    const url = `http://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // iframe: https://www.youtube.com/embed/${videoId}

    const dropdownChildren = menu.map((option, key) => (
      <div
        key={key}
        className="dropdown-item"
        onClick={e => onShow(e, id, option)}
      >
        {option}
      </div>
    ));
    console.log(`music item ${title} render...`);

    return (
      <div id="musicitem-container">
        <div className="thumbnail-wrapper" ref={this.container}>
          <div className="musicitem-thumbnail">
            <img src={url} onClick={e => onPlay(e, id)} />
          </div>
          <div className="dropdown-options" onClick={toggleDropdownMenu}>
            <img src={ThreeDotsImage} alt="options" />
          </div>
          <Dropdown showDropdown={showDropdown}>{dropdownChildren}</Dropdown>
          <div className="title-text">
            {title} - {artist} ({star})
          </div>
        </div>
      </div>
    );
  }
}

export default MusicItem;
