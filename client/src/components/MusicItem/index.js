import React from "react";

import "./MusicItem.scss";

const MusicItem = ({ title, artist, videoId, star }) => {
  const url = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div id="musicitem-container">
      <div>
        <iframe
          src={url}
          width="320"
          height="200"
          allowFullScreen="allowfullscreen"
        ></iframe>
      </div>
      <div>
        {title} - {artist}
      </div>
    </div>
  );
};

export default MusicItem;
