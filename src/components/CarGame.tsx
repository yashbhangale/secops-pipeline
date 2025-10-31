import React, { useCallback, useEffect, useRef, useState } from 'react';

interface CarGameProps {
  isRunning: boolean;
  onScoreChange: (score: number) => void;
  onCrash: () => void;
  difficulty: 'easy' | 'normal' | 'hard';
}

interface Vector2D {
  x: number;
  y: number;
}

interface Player {
  position: Vector2D;
  width: number;
  height: number;
  lane: number;
}

interface Obstacle extends Vector2D {
  width: number;
  height: number;
  speed: number;
}

const CAR_COLOR = '#2563eb';
const ROAD_COLOR = '#1f2937';
const LINE_COLOR = '#9ca3af';
const OBSTACLE_COLOR = '#ef4444';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const CarGame = (props: CarGameProps) => {
  const { isRunning, onScoreChange, onCrash, difficulty } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 360, height: 600 });
  const [player, setPlayer] = useState<Player>({
    position: { x: 0, y: 0 },
    width: 40,
    height: 70,
    lane: 1,
  });
  const lanes = 3;
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [roadOffset, setRoadOffset] = useState<number>(0);
  const scoreRef = useRef<number>(0);

  // Difficulty tuning
  const difficultyConfig = {
    easy: { spawnMs: 1200, speed: 150 },
    normal: { spawnMs: 900, speed: 200 },
    hard: { spawnMs: 650, speed: 260 },
  } as const;

  const spawnIntervalMs = difficultyConfig[difficulty].spawnMs;
  const baseSpeed = difficultyConfig[difficulty].speed;

  // Resize canvas responsively
  useEffect(() => {
    const computeSize = () => {
      const maxWidth = Math.min(window.innerWidth - 24, 420);
      const width = Math.max(300, maxWidth);
      const height = Math.min(Math.max(520, Math.floor(width * 1.6)), window.innerHeight - 160);
      setCanvasSize({ width, height });
    };
    computeSize();
    window.addEventListener('resize', computeSize);
    return () => window.removeEventListener('resize', computeSize);
  }, []);

  // Initialize player position when canvas changes
  useEffect(() => {
    const laneWidth = canvasSize.width * 0.2; // road ~ 60% of canvas width
    const roadLeft = (canvasSize.width - laneWidth * lanes) / 2;
    const playerY = canvasSize.height - 90;
    const startLane = 1;
    const playerX = roadLeft + startLane * laneWidth + (laneWidth - player.width) / 2;
    setPlayer((prev: Player) => ({ ...prev, position: { x: playerX, y: playerY }, lane: startLane }));
  }, [canvasSize.width, canvasSize.height, lanes, player.width]);

  const moveLane = useCallback((delta: number) => {
    setPlayer((prev: Player) => {
      const laneWidth = canvasSize.width * 0.2;
      const roadLeft = (canvasSize.width - laneWidth * lanes) / 2;
      const newLane = clamp(prev.lane + delta, 0, lanes - 1);
      const newX = roadLeft + newLane * laneWidth + (laneWidth - prev.width) / 2;
      return { ...prev, lane: newLane, position: { x: newX, y: prev.position.y } };
    });
  }, [canvasSize.width, lanes]);

  // Controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isRunning) return;
      if (e.key === 'ArrowLeft') moveLane(-1);
      if (e.key === 'ArrowRight') moveLane(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isRunning, player.lane, canvasSize.width, lanes, moveLane]);

  // Spawn obstacles
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      const laneWidth = canvasSize.width * 0.2;
      const roadLeft = (canvasSize.width - laneWidth * lanes) / 2;
      const laneIndex = Math.floor(Math.random() * lanes);
      const width = 40;
      const height = 60;
      const x = roadLeft + laneIndex * laneWidth + (laneWidth - width) / 2;
      const y = -height;
      const speed = baseSpeed + Math.random() * 60;
      setObstacles((prev: Obstacle[]) => [...prev, { x, y, width, height, speed }]);
    }, spawnIntervalMs);
    return () => clearInterval(id);
  }, [isRunning, lanes, canvasSize.width, baseSpeed, spawnIntervalMs]);

  // Game loop
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const step = (timestamp: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = timestamp;
      const dtSec = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      // Clear
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      // Draw road background
      ctx.fillStyle = ROAD_COLOR;
      const roadWidth = canvasSize.width * 0.6;
      const roadLeft = (canvasSize.width - roadWidth) / 2;
      ctx.fillRect(roadLeft, 0, roadWidth, canvasSize.height);

      // Lane markers
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 2;
      const laneWidth = roadWidth / lanes;
      setRoadOffset((prev: number) => (prev + dtSec * baseSpeed * 0.8) % 40);
      const localOffset = roadOffset;
      for (let i = 1; i < lanes; i++) {
        const x = roadLeft + i * laneWidth;
        for (let y = -40; y < canvasSize.height + 40; y += 40) {
          ctx.beginPath();
          ctx.moveTo(x, y + localOffset);
          ctx.lineTo(x, y + 20 + localOffset);
          ctx.stroke();
        }
      }

      // Update obstacles
      let crashed = false;
      setObstacles((prev: Obstacle[]) => {
        const updated = prev
          .map((o: Obstacle) => ({ ...o, y: o.y + o.speed * dtSec }))
          .filter((o: Obstacle) => o.y < canvasSize.height + 100);
        // Collision detection
        for (const o of updated) {
          if (rectsOverlap(player.position.x, player.position.y, player.width, player.height, o.x, o.y, o.width, o.height)) {
            crashed = true;
            break;
          }
        }
        return updated;
      });

      // Draw obstacles
      ctx.fillStyle = OBSTACLE_COLOR;
      obstacles.forEach((o: Obstacle) => {
        ctx.fillRect(o.x, o.y, o.width, o.height);
      });

      // Draw player car
      ctx.fillStyle = CAR_COLOR;
      ctx.fillRect(player.position.x, player.position.y, player.width, player.height);

      // Update score
      if (isRunning && !crashed) {
        scoreRef.current += dtSec * 100;
        const next = Math.floor(scoreRef.current);
        onScoreChange(next);
      }

      if (crashed) {
        onCrash();
        cancelFrame();
        return;
      }

      if (isRunning) frameRef.current = requestAnimationFrame(step);
    };

    const start = () => {
      cancelFrame();
      lastTimeRef.current = null;
      frameRef.current = requestAnimationFrame(step);
    };

    const cancelFrame = () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };

    if (isRunning) start();
    else cancelFrame();

    return () => cancelFrame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, canvasSize.width, canvasSize.height, player.position.x, player.position.y, player.width, player.height, lanes, obstacles, baseSpeed]);

  // Reset score when game (re)starts
  useEffect(() => {
    if (isRunning) scoreRef.current = 0;
  }, [isRunning]);

  // Helpers
  const rectsOverlap = (
    ax: number,
    ay: number,
    aw: number,
    ah: number,
    bx: number,
    by: number,
    bw: number,
    bh: number,
  ) => !(ax + aw < bx || ax > bx + bw || ay + ah < by || ay > by + bh);

  return (
    <div className="w-full flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="rounded-xl shadow-lg bg-gray-900 w-full h-auto"
      />

      {/* Mobile controls */}
      <div className="mt-4 grid grid-cols-2 gap-3 w-full max-w-sm">
        <button
          onClick={() => moveLane(-1)}
          className="py-3 bg-indigo-600 text-white rounded-lg active:scale-[0.98]"
        >
          Move Left
        </button>
        <button
          onClick={() => moveLane(1)}
          className="py-3 bg-indigo-600 text-white rounded-lg active:scale-[0.98]"
        >
          Move Right
        </button>
      </div>
    </div>
  );
};

export default CarGame;


