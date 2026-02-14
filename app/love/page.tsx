"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";

export default function ValentinePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-typing effect variables
  const message = [
    "在这个特别的日子里...",
    "我想告诉你一些藏在心里很久的话。",
    "你的笑容是我每天最期待的风景。",
    "遇你，是我这辈子最幸运的事。",
    "不知不觉中，你已经占据了我所有的思绪。",
    "未来的每一天，我都想和你一起度过。",
  ];

  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (isOpen && currentLine < message.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (isOpen && currentLine === message.length) {
      setTimeout(() => setShowQuestion(true), 1000);
    }
  }, [isOpen, currentLine]);

  const handleAccept = () => {
    setAccepted(true);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff0000", "#ff69b4", "#ffc0cb"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff0000", "#ff69b4", "#ffc0cb"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const moveNoButton = () => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const x = Math.random() * (containerRect.width - 100) - (containerRect.width / 2 - 50);
      const y = Math.random() * (containerRect.height - 100) - (containerRect.height / 2 - 50);
      setNoBtnPosition({ x, y });
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: "100vh" }}
            animate={{
              opacity: [0, 0.5, 0],
              y: "-100vh",
              x: Math.random() * 100 - 50,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            className="absolute text-pink-200"
            style={{ left: `${Math.random() * 100}%`, fontSize: `${Math.random() * 20 + 10}px` }}
          >
            ❤
          </motion.div>
        ))}
      </div>

      <div ref={containerRef} className="max-w-lg w-full relative z-10">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white p-8 rounded-full shadow-xl border-4 border-pink-100 relative"
              >
                <Heart className="w-24 h-24 text-red-500 fill-red-500" />
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                  点击开启
                </div>
              </motion.div>
              <p className="mt-6 text-pink-800 font-medium text-lg tracking-widest">
                有一封给你的信
              </p>
            </motion.div>
          ) : !accepted ? (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-pink-100 min-h-[400px] flex flex-col items-center justify-center text-center"
            >
              <div className="space-y-4 mb-8">
                {message.slice(0, currentLine).map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-700 text-lg font-light leading-relaxed font-serif"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {showQuestion && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 mt-4"
                >
                  <h2 className="text-2xl font-bold text-pink-600">
                    做我的 Valentine 好吗？
                  </h2>
                  <div className="flex gap-4 justify-center items-center relative h-16">
                    <button
                      onClick={handleAccept}
                      className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all z-20"
                    >
                      我愿意 ❤
                    </button>
                    
                    <motion.button
                      animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                      onMouseEnter={moveNoButton}
                      onClick={moveNoButton}
                      className="px-8 py-3 bg-gray-200 text-gray-500 rounded-full font-semibold absolute transition-colors duration-200 z-10"
                    >
                      再想想
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/90 backdrop-blur p-10 rounded-3xl shadow-2xl text-center border-4 border-red-100"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Heart className="w-32 h-32 text-red-500 fill-red-500 mx-auto mb-6" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                太好了！
              </h1>
              <p className="text-xl text-gray-600">
                这是我今年收到的最好的礼物。
                <br />
                情人节快乐！🌹
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
