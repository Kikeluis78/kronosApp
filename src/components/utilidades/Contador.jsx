// src/components/utilidades/Contador.jsx
import { useState, useEffect } from 'react';

export default function Contador() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 0.0000001);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-2xl font-mono text-indigo-400 mt-4">
      {count.toFixed(7)}
    </div>
  );
}
