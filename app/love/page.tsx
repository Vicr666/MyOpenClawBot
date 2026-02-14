"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Star, Heart, Music, Gift } from "lucide-react";

export default function ValentinePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 更加含蓄、欣赏的文案
  const message = [
    "嗨，",
    "在这个特别的日子里，",
    "我想把这份小小的仪式感送给你。",
    "虽然我们认识的时间不长，",
    "但和你交流的每一个瞬间，",
    "都让我感到轻松而愉快。",
    "很庆幸，能在茫茫人海中遇见发光的你。",
    "愿未来的日子里，我们能发现更多彼此的闪光点。",
  ];

  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (isOpen && currentLine < message.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 1200); // 稍微加快一点节奏
      return () => clearTimeout(timer);
    } else if (isOpen && currentLine === message.length) {
      setTimeout(() => setShowButton(true), 800);
    }
  }, [isOpen, currentLine]);

  const handleAccept = () => {
    setAccepted(true);
    triggerFirework();
  };

  const triggerFirework = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    // 更多样化的庆祝效果
    const frame = () => {
      // 左侧花瓣
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FFB7B2", "#FFDAC1", "#E2F0CB"],
        shapes: ["circle", "square"],
      });
      // 右侧星星
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#B5EAD7", "#C7CEEA", "#FF9AA2"],
        shapes: ["star"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* 动态梦幻背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 漂浮的光点和星星 */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            initial={{ opacity: 0, y: "100vh" }}
            animate={{
              opacity: [0, 0.8, 0],
              y: "-100vh",
              x: Math.random() * 200 - 100,
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 8 + 7,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            className="absolute text-purple-200/60"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            {i % 2 === 0 ? <Star fill="currentColor" /> : <Sparkles />}
          </motion.div>
        ))}
        {/* 漂浮的花瓣 */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`flower-${i}`}
            initial={{ opacity: 0, rotate: 0, y: "-10vh" }}
            animate={{
              opacity: [0, 0.6, 0],
              y: "110vh",
              rotate: 360,
              x: Math.sin(i) * 100,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            className="absolute text-pink-200/50"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 15 + 10}px`,
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      <div ref={containerRef} className="max-w-lg w-full relative z-10 perspective-1000">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              <div className="relative">
                {/* 光晕效果 */}
                <div className="absolute inset-0 bg-pink-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 backdrop-blur-md p-10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 relative z-10"
                >
                  <Gift className="w-20 h-20 text-indigo-400 stroke-1" />
                </motion.div>
              </div>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                delay={0.2}
                className="mt-8 text-slate-600 font-light text-lg tracking-[0.2em]"
              >
                TO: 一个特别的新朋友
              </motion.p>
              <p className="text-xs text-slate-400 mt-2 animate-pulse">点击查收</p>
            </motion.div>
          ) : !accepted ? (
            <motion.div
              key="letter"
              initial={{ opacity: 0, rotateX: -90, y: 50 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              className="bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgb(0,0,0,0.1)] border border-white/40 min-h-[500px] flex flex-col items-center justify-between text-center relative overflow-hidden"
            >
              {/* 装饰边框 */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-200 via-pink-200 to-indigo-200 opacity-50"></div>

              <div className="space-y-6 w-full flex-1 flex flex-col justify-center">
                {message.slice(0, currentLine).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <p className="text-slate-700 text-lg md:text-xl font-light leading-relaxed tracking-wide font-[Songti SC, serif]">
                      {line}
                    </p>
                  </motion.div>
                ))}
              </div>

              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 w-full"
                >
                  <button
                    onClick={handleAccept}
                    className="group relative w-full py-4 px-8 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 text-slate-600 font-medium tracking-widest group-hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
                      <span>✨</span> 很高兴遇见你
                    </span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
              className="bg-white/40 backdrop-blur-md p-12 rounded-3xl shadow-xl text-center border border-white/60 max-w-sm"
            >
              <div className="mb-8 relative inline-block">
                <div className="absolute inset-0 bg-pink-200 blur-2xl opacity-40 rounded-full"></div>
                <Sparkles className="w-20 h-20 text-indigo-400 relative z-10 mx-auto" strokeWidth={1} />
              </div>
              
              <h1 className="text-2xl font-light text-slate-700 mb-4 tracking-wider">
                未来可期
              </h1>
              <p className="text-slate-500 font-light leading-relaxed">
                愿这份相遇<br/>
                能成为我们生活里的小确幸<br/>
                <span className="text-sm opacity-60 mt-4 block">Happy Valentine's Day</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
