// components/TopBar.tsx
interface TopBarProps {
    part: string;
  }
  
  export default function TopBar({ part }: TopBarProps) {
    return (
      <div className="p-4 text-center text-sm font-medium bg-gray-100">
        {part.toUpperCase()}
      </div>
    );
  }
  