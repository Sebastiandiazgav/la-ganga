import React from 'react';

interface MessageContentProps {
  text: string;
}

const MessageContent: React.FC<MessageContentProps> = ({ text }) => {
  // Expresión regular para encontrar URLs en un texto.
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (part.match(urlRegex)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline" // Estilo para que combine con nuestro tema.
            >
              {part}
            </a>
          );
        }
        return part;
      })}
    </>
  );
};

export default MessageContent;
