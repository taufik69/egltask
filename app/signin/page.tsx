import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="bg-[url('/logingradientbg.png')] bg-cover bg-center h-screen flex items-center justify-center">
      <div className="left"></div>
      {/* <div className="right">
        <Image src="/loginsidebar.png" alt="Logo" width={659} height={833} />
      </div> */}
    </div>
  );
};

export default page;
