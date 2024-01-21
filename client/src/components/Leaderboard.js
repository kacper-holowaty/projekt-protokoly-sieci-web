import React, { useState, useEffect } from "react";
import axios from "axios";

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/scores", {
          params: {
            player: playerName,
            difficulty: difficulty,
          },
        });

        setScores(response.data.scores);
      } catch (error) {
        console.error("Błąd podczas pobierania wyników:", error);
      }
    };

    fetchData();
  }, [playerName, difficulty]);

  const handleInputChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleSelectChange = (e) => {
    setDifficulty(e.target.value);
  };

  const displayTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div>
      <h2>Tablica wyników</h2>
      <form>
        <label>
          Nazwa gracza:
          <input type="text" value={playerName} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Poziom trudności:
          <select value={difficulty} onChange={handleSelectChange}>
            <option value="">-- Wybierz --</option>
            <option value="ŁATWY">ŁATWY</option>
            <option value="ŚREDNI">ŚREDNI</option>
            <option value="TRUDNY">TRUDNY</option>
          </select>
        </label>
      </form>
      <ol>
        {scores.map((score, index) => (
          <li key={index}>
            {`Nazwa gracza: ${score.player}, Czas: ${displayTime(
              score.gameTimeInSeconds
            )} min, Poziom trudności: ${score.difficulty}`}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;