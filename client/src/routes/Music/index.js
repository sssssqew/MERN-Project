import React from "react";

import LoadImage from "assets/images/loading.gif";
import addBtnImage from "assets/images/add.png";

import "./Music.scss";
import MusicItem from "components/MusicItem";
import Modal from "components/Modal";
import Input from "components/Input";
import Notification from "components/Notification";

class Music extends React.Component {
  state = {
    musics: [],
    isLoading: true,
    isShow: false,
    isNotFilledAll: false,
    notifyActive: false,
    title: "",
    artist: "",
    videoId: "",
    selectedVideoId: "",
    msg: ""
  };
  deleteMusic = async (e, id) => {
    const { getMusics, showNotification } = this;
    console.log("delete id: ", id);
    const { msg } = await fetch(`/api/musics/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
    getMusics();
    showNotification(msg);
  };
  getMusics = async () => {
    const musics = await fetch("/api/musics").then(res => res.json());
    this.setState({ musics, isLoading: false });
  };
  addMusic = async () => {
    const { title, artist, videoId } = this.state;
    const { getMusics, hideModal, showNotification } = this;

    if (title && artist && videoId) {
      const { msg } = await fetch("/api/musics", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, artist, videoId })
      }).then(res => res.json());

      hideModal();
      getMusics();
      showNotification(msg);

      this.setState({
        isNotFilledAll: false,
        title: "",
        artist: "",
        videoId: ""
      });
    } else {
      this.setState({ isNotFilledAll: true });
    }
  };
  showModal = e => {
    this.setState({ isShow: true });
  };
  hideModal = e => {
    this.setState({ isShow: false });
  };
  handleChange = e => {
    console.log(`${e.target.name}: ${e.target.value}`);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  playMusicVideo = (e, id) => {
    // onClick의 첫번째 인자는 event 객체이기 때문에 두번째 인자로 id를 넘겨줌
    const { musics } = this.state;
    const selectedVideo = musics.filter(music => music._id === id);
    // console.log("selectedVideo: ", selectedVideo[0]);
    this.setState({ selectedVideoId: selectedVideo[0].videoId });
  };
  showNotification = msg => {
    this.setState({ notifyActive: true, msg: msg }, () => {
      setTimeout(() => {
        this.setState({ notifyActive: false, msg: "" });
      }, 3500);
    });
  };
  componentDidMount() {
    this.getMusics();
  }

  render() {
    console.log("render...");
    const {
      musics,
      isLoading,
      isShow,
      isNotFilledAll,
      selectedVideoId,
      title,
      artist,
      videoId,
      notifyActive,
      msg
    } = this.state;
    const {
      showModal,
      hideModal,
      addMusic,
      handleChange,
      playMusicVideo,
      deleteMusic
    } = this;
    console.log(selectedVideoId);
    const url = `https://www.youtube.com/embed/${
      selectedVideoId ? selectedVideoId : musics[0] ? musics[0].videoId : "" // 처음 로딩시에는 첫번째 비디오를 가져옴
    }`;

    return (
      <div>
        {isLoading ? (
          <div id="music-container">
            <img src={LoadImage} alt="loading" />
          </div>
        ) : (
          <div id="music-container">
            <div className="video-wrapper">
              <iframe
                src={url}
                width="100%"
                height="700"
                allowFullScreen="allowfullscreen"
                frameBorder="0"
              ></iframe>
            </div>

            <Notification active={notifyActive} msg={msg} />

            <Modal isShow={isShow} onCreate={addMusic} onClose={hideModal}>
              <p className="title">Title</p>
              <div className="content">
                <p>
                  Can you fill out below information to add new music video?
                </p>
                {isNotFilledAll ? (
                  <p id="error-message">
                    "You didnt fill out all information ):"
                  </p>
                ) : (
                  ""
                )}
                <Input
                  name="title"
                  placeholder="Type song title..."
                  onChange={handleChange}
                  value={title}
                />
                <Input
                  name="artist"
                  placeholder="Type song artist..."
                  onChange={handleChange}
                  value={artist}
                />
                <Input
                  name="videoId"
                  placeholder="Type song id..."
                  onChange={handleChange}
                  value={videoId}
                />
              </div>
            </Modal>

            <div className="music-video-container">
              <div
                id="add-music-btn"
                className="music-item-container"
                onClick={showModal}
              >
                <img src={addBtnImage} alt="add-music" />
              </div>
              {musics.map((music, index) => {
                // console.log(music._id);
                // key는 각 아이템의 가장 상위 tag에 부여해야 함
                return (
                  <div className="music-item-container" key={music._id}>
                    <MusicItem
                      id={music._id}
                      title={music.title}
                      artist={music.artist}
                      videoId={music.videoId}
                      star={music.star}
                      onPlay={playMusicVideo}
                      onDelete={deleteMusic}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Music;
