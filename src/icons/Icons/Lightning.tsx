import React from "react";

interface Props {
	className: any;
}

export const Lightning = ({ className }: Props): JSX.Element => {
	return (
		<svg
			className={`${className}`}
			fill="none"
			height="27"
			viewBox="0 0 22 27"
			width="22"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4.39976 12.2866L10.5547 1.72451C10.8003 1.303 11.2512 1.04526 11.7372 1.04526H19.0385C20.0864 1.04526 20.7534 2.18009 20.2233 3.09648M4.39976 12.2866L20.2233 3.09648M4.39976 12.2866C3.86575 13.203 4.53249 14.3416 5.58228 14.3416H6.50689L1.60361 23.1281C0.832367 24.5102 2.60466 25.8358 3.72802 24.7974L19.114 10.5748C20.033 9.72524 19.4224 8.20414 18.1848 8.20414H17.2686M4.39976 12.2866L17.2686 8.20414M20.2233 3.09648L17.2686 8.20414M20.2233 3.09648L17.2686 8.20414M2.37042 23.3287C2.37063 23.3286 2.37083 23.3284 2.37103 23.3282L2.37042 23.3287Z"
				fill="url(#paint0_linear_103_111)"
				stroke="url(#paint1_linear_103_111)"
				strokeWidth="2"
			/>
			<defs>
				<linearGradient
					gradientUnits="userSpaceOnUse"
					id="paint0_linear_103_111"
					x1="15.2531"
					x2="2.59504"
					y1="3.73009"
					y2="22.3117"
				>
					<stop offset="0.182844" stopColor="#FFE600" />
					<stop offset="0.980542" stopColor="#F09000" />
				</linearGradient>
				<linearGradient
					gradientUnits="userSpaceOnUse"
					id="paint1_linear_103_111"
					x1="6.50784"
					x2="15.5713"
					y1="-4.2876"
					y2="33.4461"
				>
					<stop offset="0.14688" stopColor="#FFE600" />
					<stop offset="0.938214" stopColor="#F09000" />
				</linearGradient>
			</defs>
		</svg>
	);
};
