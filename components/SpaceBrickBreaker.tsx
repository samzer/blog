'use client'

import React, { useState, useEffect, useRef } from 'react';

interface SpaceBrickBreakerProps {
  onClose: () => void;
}

export default function SpaceBrickBreaker({ onClose }: SpaceBrickBreakerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver' | 'won'>('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const gameLoopRef = useRef<number | null>(null);
  const touchTargetRef = useRef<number | null>(null);
  
  // Faster ball speed (7 instead of 4)
  const BALL_SPEED = 7;
  
  const gameDataRef = useRef({
    paddle: { x: 0, y: 0, width: 120, height: 15, speed: 12 },
    ball: { x: 0, y: 0, dx: BALL_SPEED, dy: -BALL_SPEED, radius: 10 },
    bricks: [] as Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      status: number;
      color: string;
      points: number;
    }>,
    keys: {} as Record<string, boolean>,
    canvas: { width: 0, height: 0 }
  });

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect mobile
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || 'ontouchstart' in window;
      setIsMobile(mobile);
      // Wider paddle on mobile for easier gameplay
      gameDataRef.current.paddle.width = mobile ? 140 : 120;
    };
    checkMobile();

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gameDataRef.current.canvas = { width: canvas.width, height: canvas.height };
    gameDataRef.current.paddle.x = canvas.width / 2 - gameDataRef.current.paddle.width / 2;
    gameDataRef.current.paddle.y = canvas.height - 60;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gameDataRef.current.canvas = { width: canvas.width, height: canvas.height };
      checkMobile();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
      }
      gameDataRef.current.keys[e.key] = true;
      
      if (e.key === ' ' && gameState === 'playing') {
        setGameState('paused');
      } else if (e.key === ' ' && gameState === 'paused') {
        setGameState('playing');
      }
      
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      gameDataRef.current.keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, onClose]);

  // Touch controls for mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (gameState !== 'playing') return;
      e.preventDefault();
      const touch = e.touches[0];
      touchTargetRef.current = touch.clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (gameState !== 'playing') return;
      e.preventDefault();
      const touch = e.touches[0];
      touchTargetRef.current = touch.clientX;
    };

    const handleTouchEnd = () => {
      touchTargetRef.current = null;
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gameState]);

  // Create bricks
  const createBricks = (currentLevel: number) => {
    const bricks: typeof gameDataRef.current.bricks = [];
    const canvasWidth = gameDataRef.current.canvas.width;
    const isMobileView = canvasWidth <= 768;
    
    const brickRowCount = Math.min(5 + currentLevel, isMobileView ? 8 : 12);
    const brickColumnCount = isMobileView ? 6 : 10;
    const brickWidth = isMobileView ? Math.floor((canvasWidth - 70) / brickColumnCount) : 75;
    const brickHeight = isMobileView ? 16 : 20;
    const brickPadding = isMobileView ? 6 : 10;
    const brickOffsetTop = isMobileView ? 100 : 80;
    const brickOffsetLeft = (canvasWidth - (brickColumnCount * (brickWidth + brickPadding))) / 2;

    const colors = ['#FF1744', '#FF6F00', '#FFD600', '#00E676', '#00B0FF', '#D500F9'];

    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        const brickX = brickOffsetLeft + c * (brickWidth + brickPadding);
        const brickY = brickOffsetTop + r * (brickHeight + brickPadding);
        const points = (brickRowCount - r) * 10;
        const colorIndex = r % colors.length;
        bricks.push({
          x: brickX,
          y: brickY,
          width: brickWidth,
          height: brickHeight,
          status: 1,
          color: colors[colorIndex],
          points: points
        });
      }
    }
    return bricks;
  };

  // Start game
  const startGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    gameDataRef.current.ball.x = canvas.width / 2;
    gameDataRef.current.ball.y = canvas.height - 80;
    gameDataRef.current.ball.dx = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    gameDataRef.current.ball.dy = -BALL_SPEED;
    gameDataRef.current.bricks = createBricks(level);
    setGameState('playing');
  };

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const game = gameDataRef.current;

    const update = () => {
      // Move paddle - keyboard controls
      if (game.keys['ArrowLeft'] && game.paddle.x > 0) {
        game.paddle.x -= game.paddle.speed;
      }
      if (game.keys['ArrowRight'] && game.paddle.x + game.paddle.width < canvas.width) {
        game.paddle.x += game.paddle.speed;
      }
      
      // Move paddle - touch controls (smooth follow)
      if (touchTargetRef.current !== null) {
        const targetX = touchTargetRef.current - game.paddle.width / 2;
        const diff = targetX - game.paddle.x;
        const moveSpeed = Math.min(Math.abs(diff), game.paddle.speed * 1.5);
        if (Math.abs(diff) > 2) {
          game.paddle.x += diff > 0 ? moveSpeed : -moveSpeed;
        }
        // Clamp paddle position
        game.paddle.x = Math.max(0, Math.min(canvas.width - game.paddle.width, game.paddle.x));
      }

      // Move ball
      game.ball.x += game.ball.dx;
      game.ball.y += game.ball.dy;

      // Ball collision with walls
      if (game.ball.x + game.ball.radius > canvas.width || game.ball.x - game.ball.radius < 0) {
        game.ball.dx = -game.ball.dx;
      }
      if (game.ball.y - game.ball.radius < 0) {
        game.ball.dy = -game.ball.dy;
      }

      // Ball collision with paddle
      if (
        game.ball.y + game.ball.radius > game.paddle.y &&
        game.ball.x > game.paddle.x &&
        game.ball.x < game.paddle.x + game.paddle.width
      ) {
        // Add spin based on where ball hits paddle
        const hitPos = (game.ball.x - game.paddle.x) / game.paddle.width;
        game.ball.dx = (hitPos - 0.5) * 10;
        game.ball.dy = -Math.abs(game.ball.dy);
      }

      // Ball falls below paddle
      if (game.ball.y + game.ball.radius > canvas.height) {
        setLives(prev => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setGameState('gameOver');
          } else {
            game.ball.x = canvas.width / 2;
            game.ball.y = canvas.height - 80;
            game.ball.dx = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
            game.ball.dy = -BALL_SPEED;
          }
          return newLives;
        });
      }

      // Ball collision with bricks
      game.bricks.forEach(brick => {
        if (brick.status === 1) {
          if (
            game.ball.x > brick.x &&
            game.ball.x < brick.x + brick.width &&
            game.ball.y > brick.y &&
            game.ball.y < brick.y + brick.height
          ) {
            game.ball.dy = -game.ball.dy;
            brick.status = 0;
            setScore(prev => prev + brick.points);
          }
        }
      });

      // Check win condition
      if (game.bricks.every(brick => brick.status === 0)) {
        setLevel(prev => prev + 1);
        game.bricks = createBricks(level + 1);
        game.ball.x = canvas.width / 2;
        game.ball.y = canvas.height - 60;
        game.ball.dx *= 1.1; // Increase speed slightly
        game.ball.dy *= 1.1;
      }
    };

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw starfield background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw bricks
      game.bricks.forEach(brick => {
        if (brick.status === 1) {
          ctx.fillStyle = brick.color;
          ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
        }
      });

      // Draw paddle
      ctx.fillStyle = '#00E5FF';
      ctx.fillRect(game.paddle.x, game.paddle.y, game.paddle.width, game.paddle.height);
      ctx.strokeStyle = '#00B8D4';
      ctx.lineWidth = 2;
      ctx.strokeRect(game.paddle.x, game.paddle.y, game.paddle.width, game.paddle.height);

      // Draw ball
      ctx.beginPath();
      ctx.arc(game.ball.x, game.ball.y, game.ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    };

    const gameLoop = () => {
      update();
      draw();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, level]);

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setLevel(1);
    startGame();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 999999,
      fontFamily: '"Press Start 2P", monospace'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'rgba(0, 0, 0, 0.95)'
        }}
      />

      {/* HUD */}
      {gameState === 'playing' && (
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          color: '#00E5FF',
          fontSize: isMobile ? '12px' : '16px',
          textShadow: '2px 2px 0px #000',
          pointerEvents: 'none'
        }}>
          <div>SCORE: {score}</div>
          <div style={{ marginTop: '8px' }}>LIVES: {'♥'.repeat(lives)}</div>
          <div style={{ marginTop: '8px' }}>LEVEL: {level}</div>
          {!isMobile && (
            <div style={{ marginTop: '20px', fontSize: '10px', color: '#FFD600' }}>
              SPACE: PAUSE | ESC: EXIT
            </div>
          )}
        </div>
      )}

      {/* Mobile Pause Button */}
      {gameState === 'playing' && isMobile && (
        <button
          onClick={() => setGameState('paused')}
          style={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '16px',
            padding: '10px 20px',
            background: '#FFD600',
            color: '#000',
            border: '3px solid #000',
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '3px 3px 0px #000',
            zIndex: 10
          }}
        >
          ⏸ PAUSE
        </button>
      )}

      {/* Menu */}
      {gameState === 'menu' && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#00E5FF',
          textShadow: '3px 3px 0px #000',
          padding: '20px',
          width: isMobile ? '90%' : 'auto'
        }}>
          <h1 style={{ fontSize: isMobile ? '32px' : '48px', marginBottom: '30px', color: '#FF1744' }}>
            SPACE<br/>BREAKER
          </h1>
          <p style={{ fontSize: isMobile ? '12px' : '14px', marginBottom: '30px', color: '#FFD600' }}>
            A RETRO 80s ARCADE GAME
          </p>
          <button
            onClick={startGame}
            style={{
              fontSize: isMobile ? '16px' : '20px',
              padding: isMobile ? '12px 30px' : '15px 40px',
              background: '#FF1744',
              color: '#FFF',
              border: '4px solid #000',
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '4px 4px 0px #000',
              transition: 'all 0.1s'
            }}
            onMouseDown={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translate(2px, 2px)';
              target.style.boxShadow = '2px 2px 0px #000';
            }}
            onMouseUp={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translate(0, 0)';
              target.style.boxShadow = '4px 4px 0px #000';
            }}
          >
            START GAME
          </button>
          <div style={{ marginTop: '40px', fontSize: isMobile ? '10px' : '12px', color: '#00E676', lineHeight: '2' }}>
            {isMobile ? (
              <>
                👆 DRAG TO MOVE PADDLE<br/>
                TAP PAUSE BUTTON TO PAUSE<br/>
                TAP ✕ TO EXIT
              </>
            ) : (
              <>
                ← → ARROWS TO MOVE<br/>
                SPACE TO PAUSE<br/>
                ESC TO EXIT
              </>
            )}
          </div>
        </div>
      )}

      {/* Paused */}
      {gameState === 'paused' && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#FFD600',
          fontSize: isMobile ? '24px' : '32px',
          textShadow: '3px 3px 0px #000'
        }}>
          PAUSED
          {isMobile ? (
            <button
              onClick={() => setGameState('playing')}
              style={{
                display: 'block',
                margin: '30px auto 0',
                fontSize: '16px',
                padding: '12px 30px',
                background: '#00E676',
                color: '#000',
                border: '4px solid #000',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '4px 4px 0px #000'
              }}
            >
              ▶ RESUME
            </button>
          ) : (
            <div style={{ fontSize: '14px', marginTop: '20px', color: '#00E5FF' }}>
              PRESS SPACE TO CONTINUE
            </div>
          )}
        </div>
      )}

      {/* Game Over */}
      {gameState === 'gameOver' && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#FF1744',
          textShadow: '3px 3px 0px #000',
          padding: '20px',
          width: isMobile ? '90%' : 'auto'
        }}>
          <h1 style={{ fontSize: isMobile ? '32px' : '48px', marginBottom: '20px' }}>GAME OVER</h1>
          <div style={{ fontSize: isMobile ? '18px' : '24px', color: '#FFD600', marginBottom: '20px' }}>
            FINAL SCORE: {score}
          </div>
          <div style={{ fontSize: isMobile ? '14px' : '16px', color: '#00E5FF', marginBottom: '30px' }}>
            LEVEL REACHED: {level}
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px'
          }}>
            <button
              onClick={resetGame}
              style={{
                fontSize: isMobile ? '14px' : '16px',
                padding: '12px 30px',
                background: '#00E676',
                color: '#000',
                border: '4px solid #000',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '4px 4px 0px #000',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              PLAY AGAIN
            </button>
            <button
              onClick={() => setGameState('menu')}
              style={{
                fontSize: isMobile ? '14px' : '16px',
                padding: '12px 30px',
                background: '#666',
                color: '#FFF',
                border: '4px solid #000',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '4px 4px 0px #000',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              MENU
            </button>
          </div>
        </div>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          fontSize: '24px',
          width: '50px',
          height: '50px',
          background: '#FF1744',
          color: '#FFF',
          border: '3px solid #000',
          cursor: 'pointer',
          fontFamily: 'inherit',
          boxShadow: '3px 3px 0px #000'
        }}
      >
        ✕
      </button>
    </div>
  );
}

