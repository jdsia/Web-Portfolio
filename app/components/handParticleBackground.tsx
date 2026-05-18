"use client";
import { useEffect, useRef } from "react";

// Minimal types for MediaPipe objects used here to avoid `any`.
type MpLandmark = { x: number; y: number; z?: number };
type MpHandsResults = { multiHandLandmarks?: MpLandmark[][] };

type MpHandsClass = new (opts: { locateFile: (f: string) => string }) => {
  setOptions: (opts: {
    maxNumHands?: number;
    modelComplexity?: number;
    minDetectionConfidence?: number;
    minTrackingConfidence?: number;
  }) => void;
  onResults: (cb: (results: MpHandsResults) => void) => void;
  send: (input: { image: HTMLVideoElement }) => Promise<void>;
};

type MpCameraClass = new (
  videoElement: HTMLVideoElement,
  options: {
    onFrame: () => Promise<void> | void;
    width?: number;
    height?: number;
  },
) => { start: () => void };

export default function HandParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const video = videoRef.current!;
    const ctx = canvas.getContext("2d")!;

    let W: number, H: number;
    let hands: MpLandmark[][] = [];

    // ---- resize ----
    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // ---- Particle pool ----
    const POOL_SIZE = 4000;
    class Particle {
      alive = false;
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
      life = 1;
      decay = 0;
      size = 1;
      col = "";
      gravity = 0.08;
      type: "fingertip" | "joint" | string = "";
      spawn(
        x: number,
        y: number,
        col: string,
        type: "fingertip" | "joint" | string,
      ) {
        this.alive = true;
        this.x = x;
        this.y = y;
        const speed =
          type === "fingertip"
            ? 2 + Math.random() * 5
            : 0.5 + Math.random() * 2;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - (type === "fingertip" ? 2 : 0.5);
        this.life = 1;
        this.decay =
          type === "fingertip"
            ? 0.012 + Math.random() * 0.018
            : 0.02 + Math.random() * 0.03;
        this.size =
          type === "fingertip" ? 2 + Math.random() * 4 : 1 + Math.random() * 2;
        this.col = col;
        this.gravity = 0.08;
        this.type = type;
      }
      update() {
        this.vx *= 0.97;
        this.vy = this.vy * 0.97 + this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.life <= 0) this.alive = false;
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.col;
        const radius = Math.max(0, this.size * this.life);
        if (radius === 0) return; // nothing to draw
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = Array.from(
      { length: POOL_SIZE },
      () => new Particle(),
    );
    const getFree = () => particles.find((p) => !p.alive) ?? null;

    const FINGER_COLORS = [
      ["#a78bfa", "#7c3aed", "#c4b5fd"],
      ["#60a5fa", "#2563eb", "#93c5fd"],
      ["#34d399", "#059669", "#6ee7b7"],
      ["#fbbf24", "#d97706", "#fde68a"],
      ["#f87171", "#dc2626", "#fca5a5"],
    ];
    const FINGER_LANDMARKS = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
      [17, 18, 19, 20],
    ];

    function spawnParticles(lms: MpLandmark[]) {
      FINGER_LANDMARKS.forEach((group, fi) => {
        const colors = FINGER_COLORS[fi];
        group.forEach((li, gi) => {
          const lm = lms[li];
          if (!lm) return;
          const isTip = gi === group.length - 1;
          for (let i = 0; i < (isTip ? 6 : 2); i++) {
            const p = getFree();
            if (p)
              p.spawn(
                lm.x * W + (Math.random() - 0.5) * 10,
                lm.y * H + (Math.random() - 0.5) * 10,
                colors[Math.floor(Math.random() * colors.length)],
                isTip ? "fingertip" : "joint",
              );
          }
        });
      });
      [0, 5, 9, 13, 17].forEach((li) => {
        const lm = lms[li];
        if (!lm) return;
        const p = getFree();
        if (p) p.spawn(lm.x * W, lm.y * H, "rgba(255,255,255,0.6)", "joint");
      });
    }

    // ---- Render loop ----
    let animId: number;
    function render() {
      animId = requestAnimationFrame(render);
      ctx.fillStyle = "rgba(5,5,8,0.18)";
      ctx.fillRect(0, 0, W, H);
      hands.forEach((lms) => spawnParticles(lms));
      ctx.globalCompositeOperation = "lighter";
      particles.forEach((p) => {
        if (p.alive) {
          p.update();
          p.draw(ctx);
        }
      });
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    }
    render();

    // ---- Load MediaPipe scripts ----
    function loadScript(src: string): Promise<void> {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const s = document.createElement("script");
        s.src = src;
        s.crossOrigin = "anonymous";
        s.onload = () => resolve();
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    async function init() {
      await loadScript(
        "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
      );
      await loadScript(
        "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
      );

      const w = window as unknown as {
        Hands: MpHandsClass;
        Camera: MpCameraClass;
      };

      const handsModel = new w.Hands({
        locateFile: (f: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`,
      });

      handsModel.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.6,
      });

      handsModel.onResults((results: MpHandsResults) => {
        hands = (results.multiHandLandmarks || []).map((lms) =>
          lms.map((lm) => ({ ...lm, x: 1 - lm.x })),
        );
      });

      const camera = new w.Camera(video, {
        onFrame: async () => {
          await handsModel.send({ image: video });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    }

    init();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: 1,
          height: 1,
        }}
        playsInline
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none", // so clicks pass through to buttons
        }}
      />
    </>
  );
}
