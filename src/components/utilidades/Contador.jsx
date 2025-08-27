// src/components/utilidades/Contador.jsx
import { useState, useEffect } from 'react';

export default function Contador() {
  const [valor, setValor] = useState(0);

  // Solo ejemplo: contador que sube lento hasta un número fijo
  useEffect(() => {
    const interval = setInterval(() => {
      setValor(prev => (prev < 0.1234567 ? prev + 0.000001 : prev));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-2xl font-mono my-4 neon-glow">
      {valor.toFixed(7)}
    </div>
  );
}
