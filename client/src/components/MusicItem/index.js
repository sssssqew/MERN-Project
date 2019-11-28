import React from "react";

import "./MusicItem.scss";

const MusicItem = ({ id, title, artist, videoId, star, onPlay }) => {
  const url = `http://img.youtube.com/vi/${videoId}/0.jpg`; // iframe: https://www.youtube.com/embed/${videoId}
  return (
    <div id="musicitem-container">
      <div>
        {/* <iframe
          src={url}
          width="100%"
          height="200"
          allowFullScreen="allowfullscreen"
          frameBorder="0"
        ></iframe> */}
      </div>
      <div className="musicitem-thumbnail">
        <img src={url} onClick={e => onPlay(e, id)} />
      </div>
      <div className="title-text">
        {title} - {artist}
      </div>
    </div>
  );
};

export default MusicItem;
