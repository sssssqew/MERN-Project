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
    modalKind: "",
    id: "",
    title: "",
    artist: "",
    videoId: "",
    star: "",
    selectedVideoId: "",
    msg: ""
  };
  storeValidStar = str => {
    let evalNum = parseFloat(str);
    evalNum = isNaN(evalNum) ? 0 : evalNum > 5 ? 5 : evalNum;
    return evalNum;
  };
  handleModal = (e, id, modalKind) => {
    const { showModal, getMusic } = this;
    showModal(e, modalKind);
    getMusic(id);
  };
  editMusic = async () => {
    const { id, title, artist, videoId } = this.state;
    const { getMusics, hideModal, showNotification, storeValidStar } = this;
    const star = storeValidStar(this.state.star);

    if (title && artist && videoId) {
      const { msg } = await fetch(`/api/musics/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, artist, videoId, star })
      }).then(res => res.json());

      hideModal();
      getMusics();
      showNotification(msg);

      this.setState({ isNotFilledAll: false });
    } else {
      this.setState({ isNotFilledAll: true });
    }
  };
  deleteMusic = async () => {
    const { id } = this.state;
    const { getMusics, hideModal, showNotification } = this;

    const { msg } = await fetch(`/api/musics/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());

    hideModal();
    getMusics();
    showNotification(msg);
  };
  getMusic = async id => {
    const music = await fetch(`/api/musics/${id}`).then(res => res.json());
    console.log(music);
    this.setState({
      id: music._id,
      title: music.title,
      artist: music.artist,
      videoId: music.videoId,
      star: music.star
    });
  };
  getMusics = async () => {
    const musics = await fetch("/api/musics").then(res => res.json());
    this.setState({ musics, isLoading: false });
  };
  addMusic = async () => {
    const { title, artist, videoId } = this.state;
    const { getMusics, hideModal, showNotification, storeValidStar } = this;
    const star = storeValidStar(this.state.star);

    if (title && artist && videoId) {
      const { msg } = await fetch("/api/musics", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, artist, videoId, star })
      }).then(res => res.json());

      hideModal();
      getMusics();
      showNotification(msg);

      this.setState({ isNotFilledAll: false });
    } else {
      this.setState({ isNotFilledAll: true });
    }
  };
  showModal = (e, modalKind) => {
    this.setState({ isShow: true, modalKind: modalKind });
  };
  // edit, delete 인 경우에는 창을 띄웠을때 해당 정보를 읽어오므로 그냥 창을 바로 닫을때 읽은 정보를 삭제해줘야 한다
  // add 기능 다시 테스트 필요함
  // 하지만 add는 창을 닫아도 안 지워지게 하고 싶다
  hideModal = e => {
    this.setState({
      isShow: false,
      modalKind: "",
      id: "",
      title: "",
      artist: "",
      videoId: "",
      star: ""
    });
  };
  handleChange = e => {
    // console.log(typeof e.target.value);
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
      }, 3000);
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
      modalKind,
      isNotFilledAll,
      selectedVideoId,
      id,
      title,
      artist,
      videoId,
      star,
      notifyActive,
      msg
    } = this.state;
    const {
      showModal,
      hideModal,
      addMusic,
      handleChange,
      playMusicVideo,
      deleteMusic,
      editMusic,
      getMusic,
      handleModal
    } = this;
    console.log(selectedVideoId);
    const url = `https://www.youtube.com/embed/${
      selectedVideoId ? selectedVideoId : musics[0] ? musics[0].videoId : "" // 처음 로딩시에는 첫번째 비디오를 가져옴
    }`;
    const inputList = [
      { name: "title", value: title, placeholder: "Type song title..." },
      { name: "artist", value: artist, placeholder: "Type song artist..." },
      { name: "videoId", value: videoId, placeholder: "Type song video Id..." },
      { name: "star", value: star, placeholder: "Type song star... (<= 5.0)" }
    ];

    const modal = {
      add: (
        <Modal
          isShow={isShow}
          onCrud={addMusic}
          onClose={hideModal}
          btnText="Add Music"
          titleText="Add Form"
        >
          <div className="content">
            <p>Can you fill out below information to add new music video?</p>
            {isNotFilledAll ? (
              <p id="error-message">"You didnt fill out all information ):"</p>
            ) : (
              ""
            )}
            {inputList.map((inputItem, key) => (
              <Input
                key={key}
                name={inputItem.name}
                placeholder={inputItem.placeholder}
                onChange={handleChange}
                value={inputItem.value}
              />
            ))}
          </div>
        </Modal>
      ),
      edit: (
        <Modal
          isShow={isShow}
          onCrud={editMusic}
          onClose={hideModal}
          btnText="Edit Music"
          titleText="Edit Form"
        >
          <div className="content">
            <p>Can you fill out below information to edit music video?</p>
            {isNotFilledAll ? (
              <p id="error-message">"You didnt fill out all information ):"</p>
            ) : (
              ""
            )}
            {inputList.map((inputItem, key) => (
              <Input
                key={key}
                name={inputItem.name}
                placeholder={inputItem.placeholder}
                onChange={handleChange}
                value={inputItem.value}
              />
            ))}
          </div>
        </Modal>
      ),
      delete: (
        <Modal
          isShow={isShow}
          onCrud={deleteMusic}
          onClose={hideModal}
          btnText="Delete Music"
          titleText="Delete Form"
        >
          <div className="content">
            <p>
              You really want to delete <br /> [ {title} - {artist} ]?
            </p>
          </div>
        </Modal>
      )
    };

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
            {modal[modalKind]}
            <div className="music-video-container">
              <div
                id="add-music-btn"
                className="music-item-container"
                onClick={e => showModal(e, "add")}
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
                      onShow={handleModal}
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
