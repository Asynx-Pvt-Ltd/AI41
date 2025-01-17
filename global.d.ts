import { Prisma } from "@prisma/client";

declare global {
  var prisma: Prisma;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": {
        src: string;
        trigger?: string;
        style?: React.CSSProperties;
        // Add any other attributes you plan to use
      };
    }
  }
}
