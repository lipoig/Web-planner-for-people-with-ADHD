import React, { useState, useEffect, useRef } from 'react';
import './TimerModal.css';

const SHAPES = [
  { id: 'balloon', emoji: '🎈', label: 'Balloon' },
  { id: 'star',    emoji: '⭐', label: 'Star'    },
];

function TimerModal() {
  const [isOpen, setIsOpen]         = useState(false);
  const [minutes, setMinutes]       = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(null);   // null = not started
  const [totalSeconds, setTotalSeconds] = useState(null);
  const [isRunning, setIsRunning]   = useState(false);
  const [shape, setShape]           = useState('balloon');
  const intervalRef                 = useRef(null);

  /* ── Tick ── */
  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, secondsLeft]);

  const handleStart = () => {
    const total = minutes * 60;
    setTotalSeconds(total);
    setSecondsLeft(total);
    setIsRunning(true);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSecondsLeft(null);
    setTotalSeconds(null);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isDone    = secondsLeft === 0;
  const isUrgent  = secondsLeft !== null && secondsLeft <= 60 && secondsLeft > 0;
  const hasStarted = secondsLeft !== null;

  /* Progress 0 → 1 as time elapses */
  const progress = (hasStarted && totalSeconds > 0)
    ? 1 - (secondsLeft / totalSeconds)
    : 0;

  const currentEmoji = SHAPES.find(s => s.id === shape)?.emoji ?? '🎈';

  const getDisplayClass = () => {
    if (isDone)    return 'timer-display done';
    if (isUrgent)  return 'timer-display urgent';
    return 'timer-display';
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        className={`timer-btn ${isRunning ? 'running' : ''}`}
        onClick={() => setIsOpen(true)}
        title="Open timer"
        aria-label="Open timer"
      >
        {isRunning ? (
          <span className="timer-btn-label">{formatTime(secondsLeft)}</span>
        ) : isDone ? '✓' : '⏱'}
      </button>

      {/* Floating shape — animates from button corner to screen center */}
      {hasStarted && !isDone && (
        <div
          className="timer-float-obj"
          style={{ '--progress': progress }}
          aria-hidden="true"
        >
          {currentEmoji}
        </div>
      )}
      {isDone && (
        <div
          className="timer-float-obj timer-float-done"
          aria-hidden="true"
        >
          {currentEmoji}
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div
          className="timer-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
        >
          <div className="timer-modal">
            <div className="timer-modal-header">
              <h2 className="timer-modal-title">Focus Timer</h2>
              <button
                className="timer-modal-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close timer"
              >
                ✕
              </button>
            </div>

            {/* Shape picker */}
            <div className="timer-shape-picker">
              {SHAPES.map(s => (
                <button
                  key={s.id}
                  className={`timer-shape-btn ${shape === s.id ? 'active' : ''}`}
                  onClick={() => setShape(s.id)}
                  aria-label={`Use ${s.label}`}
                  title={s.label}
                >
                  <span className="timer-shape-emoji">{s.emoji}</span>
                  <span className="timer-shape-label">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Countdown display */}
            {hasStarted && (
              <div className="timer-countdown">
                <div className={getDisplayClass()}>
                  {formatTime(secondsLeft)}
                </div>
                {isDone && (
                  <div className="timer-done-label">🎉 Time's up! Great work.</div>
                )}
              </div>
            )}

            {/* Slider — only shown when not actively running */}
            {!isRunning && (
              <div className="timer-slider-section">
                <div className="timer-slider-label">
                  <span className="timer-slider-text">Duration</span>
                  <span className="timer-slider-value">{minutes} min</span>
                </div>
                <input
                  type="range"
                  className="timer-slider"
                  min={1}
                  max={120}
                  step={1}
                  value={minutes}
                  onChange={(e) => {
                    setMinutes(Number(e.target.value));
                    setSecondsLeft(null);
                    setTotalSeconds(null);
                  }}
                />
                <div className="timer-slider-ticks">
                  <span className="timer-slider-tick">1</span>
                  <span className="timer-slider-tick">30</span>
                  <span className="timer-slider-tick">60</span>
                  <span className="timer-slider-tick">90</span>
                  <span className="timer-slider-tick">120</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="timer-actions">
              {!isRunning && !isDone && (
                <button className="timer-btn-start" onClick={handleStart}>
                  {hasStarted ? 'Resume' : 'Start'}
                </button>
              )}
              {isRunning && (
                <button className="timer-btn-stop" onClick={handleStop}>
                  Pause
                </button>
              )}
              {hasStarted && (
                <button className="timer-btn-reset" onClick={handleReset}>
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TimerModal;
