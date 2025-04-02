// import React, { useState, useEffect, useRef } from "react";
// import "./App.css";

// function App() {
//   const [songs, setSongs] = useState([]);
//   const [selectedSong, setSelectedSong] = useState("");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   // Fetch songs from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/songs")
//       .then((response) => response.json())
//       .then((data) => {
//         setSongs(data);
//         if (data.length > 0) {
//           setSelectedSong(`http://localhost:5000/music/${data[0].file_path}`);
//         }
//       })
//       .catch((error) => console.error("Error fetching songs:", error));
//   }, []);

//   const handleSelectChange = (event) => {
//     setSelectedSong(`http://localhost:5000/music/${event.target.value}`);
//     setIsPlaying(false);
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//   };

//   const handlePlay = () => {
//     if (audioRef.current) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Select a Song</h2>
//       <select onChange={handleSelectChange} value={selectedSong}>
//         {songs.map((song) => (
//           <option key={song.id} value={song.file_path}>
//             {song.name}
//           </option>
//         ))}
//       </select>
//       <button onClick={handlePlay}>{isPlaying ? "Playing..." : "Play"}</button>
//       <audio ref={audioRef} src={selectedSong} controls></audio>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(""); // Store only the file name
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Fetch songs from backend
  useEffect(() => {
    fetch("http://localhost:5000/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
        if (data.length > 0) {
          setSelectedSong(data[0].file_path); // Only store filename
        }
      })
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  const handleSelectChange = (event) => {
    setSelectedSong(event.target.value);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="container">
      <h2>Select a Song</h2>
      <select onChange={handleSelectChange} value={selectedSong}>
        {songs.map((song) => (
          <option key={song.id} value={song.file_path}>
            {song.name} {/* ✅ Displays the actual song name */}
          </option>
        ))}
      </select>
      <button onClick={handlePlay}>{isPlaying ? "Playing..." : "Play"}</button>
      <audio ref={audioRef} src={`http://localhost:5000/music/${selectedSong}`} controls></audio>
    </div>
  );
}

export default App;
