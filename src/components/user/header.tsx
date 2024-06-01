import { ModeToggle } from "../common/mode-toggle"

interface UserHeaderProps {
    prop: string;
  }
  


  export const UserHeader: React.FC<UserHeaderProps> = ({ prop }) => {
    return (
      <div className="h-[70px] border-b border-gray-200 flex items-center pl-2 pr-4 justify-between">
        <span className="text-xl font-bold">{prop}</span>
        <ModeToggle />
      </div>
    );
  };