import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import axios from "axios";

function UserPlaylistCard({ item, setUpdates }) {
  const navigate = useNavigate();
  const [editToggler, setEditToggler] = useState(false);
  const [inputValue, setInputValue] = useState(item.playlistTitle);
  const [coverImgUrl, setCoverImgUrl] = useState("");

  const timeOutFunc = () => {
    setTimeout(() => {
      setEditToggler(false);
    }, 20000);
  };

  const editPlaylistNameEventHandler = async (playlistIdd) => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/savedPlaylist/editPlaylistName",
        {
          playlistId: playlistIdd,
          newPlaylistTitle: inputValue,
          newcoverImg: coverImgUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      setEditToggler((prev) => !prev);
      setUpdates((prev) => !prev);
      setCoverImgUrl("");
      clearTimeout(timeOutFunc);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deletePlaylistNameEventHandler = async (playlistIdd) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/savedPlaylist/deletePlaylist",
        {
          data: { playlistId: playlistIdd },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      setUpdates((prev) => !prev);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div
      className="card p-2 md:p-4 hover:bg-[#181818] rounded-lg"
      onClick={() => {
        navigate(`/findPlaylist/${item._id}`);
      }}
    >
      <div className="w-[170px] md:w-[164px]">
        <div className="relative h-[170px] md:h-[164px] rounded-lg overflow-hidden">
          <img
            src={item.coverImg}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        {editToggler ? (
          <>
            <div
              className="editDiv flex justify-between items-center gap-2 py-2 px-1 w-[100%]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editPlaylistNameEventHandler(item._id);
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  className="w-full outline-none rounded-lg px-1 text-sm bg-transparent border placeholder:text-xs"
                  placeholder="Playlist Title"
                  required
                />
                <input
                  type="url"
                  value={coverImgUrl}
                  onChange={(e) => {
                    setCoverImgUrl(e.target.value);
                  }}
                  className="w-full outline-none rounded-lg px-1 text-sm bg-transparent border mt-2 placeholder:text-xs"
                  placeholder="Cover Img - Only URL"
                />
              </form>
              <div className="flex flex-col items-center justify-center">
                <i
                  className="ri-save-line cursor-pointer text-lg hover:scale-[1.2]"
                  onClick={() => {
                    editPlaylistNameEventHandler(item._id);
                  }}
                ></i>
                <i className="ri-close-line cursor-pointer text-lg hover:scale-[1.2]" onClick={()=>{setEditToggler(false)}}></i>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="editDiv flex justify-between items-center py-2 px-1"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <h2>{item.playlistTitle}</h2>
              <div className="flex items-center gap-3">
                <i
                  className="ri-edit-2-line cursor-pointer text-lg hover:scale-[1.2]"
                  onClick={() => {
                    setEditToggler((prev) => !prev);
                    timeOutFunc();
                  }}
                ></i>
                <i
                  className="ri-delete-bin-2-line cursor-pointer text-lg hover:scale-[1.2]"
                  onClick={() => {
                    deletePlaylistNameEventHandler(item._id);
                  }}
                ></i>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserPlaylistCard;