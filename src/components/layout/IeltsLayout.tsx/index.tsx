import { Outlet } from "react-router-dom";

const IeltsLayout = () => {
  return (
    <div>
      {/* IELTS tabs, navbar, etc. can go here */}
      <Outlet />
    </div>
  );
};

export default IeltsLayout;
