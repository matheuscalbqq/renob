import { useEffect, useRef, useState } from "react";

type DismissibleAlertProps = {
  children: React.ReactNode;
  className?: string;
};

export default function DismissibleAlert({ children, className = "" }: DismissibleAlertProps) {
  const [isOpen, setIsOpen] = useState(true);     // existe no DOM
  const [isClosing, setIsClosing] = useState(false); // está animando pra fechar
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState<number>(0);

  // mede a altura do conteúdo para animar "height"
  useEffect(() => {
    if (!contentRef.current) return;

    // mede o tamanho real renderizado (inclui borda)
    const rect = contentRef.current.getBoundingClientRect();
    setMaxH(Math.ceil(rect.height));
  }, [children]);

  function handleClose() {
    // começa animação
    setIsClosing(true);

    // depois da animação, remove do DOM
    setTimeout(() => setIsOpen(false), 300);
  }

  if (!isOpen) return null;

  return (
    <div
      className={[
        "overflow-hidden transition-all duration-300 ease-in-out",
        isClosing ? "opacity-0 max-h-0" : "opacity-100",
        className,
      ].join(" ")}
      style={!isClosing ? { maxHeight: maxH } : undefined}
    >
      <div  ref={contentRef}   className="rounded-xl border border-secondary bg-secondary/20 px-2 py-1 flex items-center justify-between gap-2">

        <div className="min-w-0">{children}</div>

        <button
          type="button"
          aria-label="Fechar alerta"
          onClick={handleClose}
          className="shrink-0 rounded-md p-1 text-red-800 hover:bg-secondary/40 hover:text-red-900 transition"
        >
          {/* Ícone SVG (X) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
