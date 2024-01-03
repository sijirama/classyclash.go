import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core";

export const { uploadFiles } = generateReactHelpers<OurFileRouter>();
