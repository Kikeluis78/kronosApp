// src/components/utilidades/Spinner.jsx
export default function Spinner() {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="w-12 h-12 border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
}
