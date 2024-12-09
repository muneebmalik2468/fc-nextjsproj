import { cookies, headers } from "next/dist/client/components/headers";
import React from "react";
const page = () => {
  const localuser = cookies().get("Userlog")?.value;
const headerData = headers();

  if (localuser == "true") {
    return (
      <div>
        
            {/* Page content here */}
            Content
          
        <div>
          <h1>Helloworld</h1>
        </div>
      </div>
    );
  } else {
    return <div>Sorry</div>;
  }
};

export default page;
