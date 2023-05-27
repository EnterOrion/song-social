import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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
    formState: { isSubmitSuccessful },
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
    await addDoc(collection(db, "posts"), {
      albumCover: albumCover,
      artist: data.artist,
      dateAdded: serverTimestamp(),
      description: data.description,
      song: data.track,
      userDisplayName: auth.currentUser.displayName,
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
            {...register("track", { required: true })}
          />
          {errors.track && <span>This field is required</span>}
          <input
            type="text"
            placeholder="Enter the artist of the track as it appears on Spotify"
            {...register("artist", { required: true })}
          />
          {errors.artist && <span>This field is required</span>}
          <textarea
            placeholder="List some reasons why. Reminds you of an old crush? It fits the weather right now?"
            {...register("description", { required: true })}
          />
          {errors.description && <span>This field is required</span>}
        </div>
        <button className="submit-post">Submit</button>
      </form>
    </div>
  );
};

export default NewPost;
