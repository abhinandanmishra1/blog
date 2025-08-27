import React from 'react';

interface CodeSandboxProps {
  id: string;
  title?: string;
  height?: string;
}

export const CodeSandbox: React.FC<CodeSandboxProps> = ({ 
  id, 
  title, 
  height = '500px' 
}) => {
  return (
    <div className="my-8">
      <iframe
        src={`https://codesandbox.io/embed/${id}?fontsize=14&hidenavigation=1&theme=dark`}
        style={{ height }}
        className="w-full border-0 rounded-lg"
        title={title || 'CodeSandbox Demo'}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </div>
  );
};