import React from "react";

import LoadImage from "assets/images/loading.gif";
import addBtnImage from "assets/images/add.png";

import "./Music.scss";
import MusicItem from "components/MusicItem";
import Modal from "components/Modal";
import Input from "components/Input";

class Music extends React.Component {
  state = {
    musics: [],
    isLoading: true,
    isShow: false
  };
  getMusics = async () => {
    const musics = await fetch("/api/musics").then(res => res.json());
    this.setState({ musics, isLoading: false });
  };
  showModal = e => {
    this.setState({ isShow: true });
  };
  hideModal = e => {
    this.setState({ isShow: false });
  };
  componentDidMount() {
    this.getMusics();
  }
  render() {
    const { musics, isLoading, isShow } = this.state;
    const { showModal, hideModal } = this;

    return (
      <div>
        {isLoading ? (
          <div id="music-container">
            <img src={LoadImage} alt="loading" />
          </div>
        ) : (
          <div id="music-container">
            <Modal isShow={isShow} onClose={hideModal}>
              <p className="title">Title</p>
              <div className="content">
                <p>
                  Can you fill out below information to add new music video?
                </p>
                <Input placeholder="Type song title..." />
                <Input placeholder="Type song artist..." />
                <Input placeholder="Type song id..." />
              </div>
            </Modal>
            <div id="add-music-btn" onClick={showModal}>
              <img src={addBtnImage} alt="add-music" />
            </div>
            {musics.map((music, key) => {
              // console.log(music);
              return (
                <MusicItem
                  id={music.id}
                  key={key}
                  title={music.title}
                  artist={music.artist}
                  videoId={music.videoId}
                  star={music.star}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Music;
