import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/init";

interface newPostContents {
  pfp: "string";
  token: "string";
}

const NewPost: FC = (props: newPostContents) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    formState,
  } = useForm({
    criteriaMode: "all",
  });
  async function onSubmit(data, e) {
    e.preventDefault();
    const results = await verifySong(props.token, data.track, data.artist);
    console.log(results);
    if (results.error) {
      if (results.error.status === 401 || results.error.status === 403) {
        setError("root.serverError", {
          type: "401",
        });
        console.log("Authentication error! Refresh the page to try again.");
        return;
      }
      setError("root.serverError", {
        type: "500",
      });
      console.log("Server error!");
      return;
    } else if (results.tracks.items.length < 1) {
      setError("root.serverError", {
        type: "404",
      });
      console.log("Artist or song not found!");
      return;
    }
    const albumCover = results.tracks.items[0].album.images[0].url;
    const songID = results.tracks.items[0].id;
    const now = new Date();
    const utc_timestamp = Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );
    await addDoc(collection(db, "posts"), {
      albumCover: albumCover,
      artist: data.artist,
      dateAdded: utc_timestamp,
      description: data.description,
      song: data.track,
      songID: songID,
      userDisplayName: auth.currentUser.displayName,
      userPFP: auth.currentUser.photoURL,
    });
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ track: "", artist: "", description: "" });
    }
  }, [formState, reset]);

  async function verifySong(token, track, artist) {
    console.log(token);
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=remaster%2520track%3A${track}%2520artist%3A${artist}&type=track&limit=1`,
      {
        method: "GET",
        headers: {
          Accept: "application/x-www-form-urlencoded; application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.json();
  }

  return (
    <div className="new-post">
      <div className="post-user">
        <Link to="/profile">
          <img
            className="post-pfp"
            src={props.pfp}
            alt="User profile picture"
          />
        </Link>
        <h1 className="user-song larger">
          <strong>What have you been listening to on repeat?</strong>
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="post-input">
          <input
            type="text"
            placeholder="Enter the track title here as it appears on Spotify"
            {...register("track", { required: true, maxLength: 400 })}
          />

          <input
            type="text"
            placeholder="Enter the artist of the track as it appears on Spotify"
            {...register("artist", { required: true, maxLength: 100 })}
          />

          <textarea
            placeholder="List some reasons why. Reminds you of an old crush? It fits the weather right now?"
            {...register("description", { required: true, maxLength: 500 })}
          />

          {errors.track?.type === "required" && (
            <li>The track field is required.</li>
          )}
          {errors.track?.type === "maxLength" && (
            <li>Max length for tracks is 400 characters</li>
          )}
          {errors.artist?.type === "required" && (
            <li>The artist field is required.</li>
          )}
          {errors.artist?.type === "maxLength" && (
            <li>Max length for artists is 100 characters</li>
          )}
          {errors.description?.type === "required" && (
            <li>The description field is required.</li>
          )}
          {errors.description?.type === "maxLength" && (
            <li>Max length for the description is 500 characters</li>
          )}
          {errors.root?.serverError?.type === "404" && (
            <li>Artist or track not found. Check spelling and try again.</li>
          )}
        </div>
        <button className="submit-post">Submit</button>
      </form>
    </div>
  );
};

export default NewPost;
