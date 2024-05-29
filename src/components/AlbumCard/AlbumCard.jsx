import React from "react";
import "remixicon/fonts/remixicon.css";

function AlbumCard({item}) {
  return (
    <div
      className="card p-2 md:p-4 hover:bg-[#181818] rounded-lg"
      // onClick={}
    >
      <div className="w-[170px] md:w-[164px]">
        <div className="relative h-[170px] md:h-[164px] rounded-lg overflow-hidden">
          <img
            src={item.songs[0].img}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 md:gap-2 my-2 px-1">
          <h2>{item.folderName}</h2>
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;