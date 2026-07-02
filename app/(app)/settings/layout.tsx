import React from "react";
import SettingsMenu from "./_components/SettingsMenu";

function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SettingsMenu />
      <div className="col-span-6 p-8">{children}</div>
    </>
  );
}

export default SettingsLayout;
