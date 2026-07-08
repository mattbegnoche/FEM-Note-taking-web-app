import React from "react";
import SettingsMenu from "./_components/SettingsMenu";
import SettingsContent from "./_components/SettingsContent";

function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SettingsMenu />
      <SettingsContent>{children}</SettingsContent>
    </>
  );
}

export default SettingsLayout;
