import { Prisma } from '@prisma/client';

declare global {
	var prisma: Prisma;
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'lord-icon': {
				target?: string;
				src: string;
				trigger?: string;
				style?: React.CSSProperties;
				children?: any;
				colors?: any;
				delay?: any;
				// Add any other attributes you plan to use
			};
		}
	}
}
