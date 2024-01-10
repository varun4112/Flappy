import React, { useState, useEffect } from 'react';
import Bird from './components/Bird';
import Pipes from './components/Pipes';
import './App.css';
 
const App = () => {
    const [birdPosition, setBirdPosition] = useState({ x: 50, y: 200 });
    const [pipes, setPipes] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
 
    const jump = () => {
        if (!gameOver && gameStarted) {
            setBirdPosition((prev) => ({ ...prev, y: prev.y - 60 }));
        } else if (!gameOver && !gameStarted) {
            setGameStarted(true);
        } else {
            setBirdPosition({ x: 50, y: 200 });
            setPipes([]);
            setGameOver(false);
            setGameStarted(true);
        }
    };
 
    const checkCollision = () => {
        const birdTop = birdPosition.y;
        const birdBottom = birdPosition.y + 50;
        const birdLeft = birdPosition.x;
        const birdRight = birdPosition.x + 50;
 
        pipes.forEach((pipe) => {
            const pipeTop = pipe.y;
            const pipeBottom = pipe.y + 600;
            const pipeLeft = pipe.x;
            const pipeRight = pipe.x + 100;
 
            const isColliding =
                birdRight > pipeLeft &&
                birdLeft < pipeRight &&
                birdBottom > pipeTop &&
                birdTop < pipeBottom;
 
            if (isColliding) {
                if (birdLeft > pipeLeft && birdRight < pipeRight && birdBottom < pipeBottom) {
                    // Bird has crashed through the pipe, increase score
                    console.log("Collision detected - Increase score");
                    setScore((prevScore) => prevScore + 1);
                } else {
                    console.log("Collision detected set 0");
                    // Bird has hit the pipe, end the game
                    setGameOver(true);
                    setGameStarted(false);
                }
            }
        });
 
        // Check if bird is out of the screen vertically
        if (birdBottom > 600 || birdTop < -170) {
            // Bird is out of bounds, end the game
            setGameOver(true);
            setGameStarted(false);
        }
    };
 
    useEffect(() => {
        checkCollision();
        console.log(score);
    }, [birdPosition, pipes, gameOver]);
 
    useEffect(() => {
        const gravity = setInterval(() => {
            setBirdPosition((prev) => ({ ...prev, y: prev.y + 5 }));
            checkCollision();
        }, 30);
 
        const pipeGenerator = setInterval(() => {
            if (!gameOver && gameStarted) {
                setPipes((prev) => [
                    ...prev,
                    { x: 400, y: Math.floor(Math.random() * 300) },
                ]);
            }
        }, 2000);
 
        const pipeMove = setInterval(() => {
            if (!gameOver && gameStarted) {
                setPipes((prev) =>
                    prev.map((pipe) => ({ ...pipe, x: pipe.x - 5 }))
                );
            }
        }, 30);
 
        return () => {
            clearInterval(gravity);
            clearInterval(pipeGenerator);
            clearInterval(pipeMove);
        };
    }, [gameOver, gameStarted]);
 
    return (
        <>
        <h1 style={{textAlign:'center'}}>Flappy Bird</h1>
        <div className={`App ${gameOver ? 'game-over' : ''}`} onClick={jump}>
            <Bird birdPosition={birdPosition} />
            {pipes.map((pipe, index) => (
                <Pipes key={index} pipePosition={pipe} />
            ))}
            {gameOver && (
                <center>
                    <div className="game-over-message" style={{backgroundColor:"white", padding:"10px", borderRadius:"5px"}} >
                        Game Over!
                        <br />
                        <p>Score: {score}</p>
                        <p style={{color:'white', padding: "2px 6px", borderRadius: '5px' }}>Click anywhere to Restart</p>
                    </div>
                </center>
            )}
        </div>
        </>
    );
};
 
export default App;