export const Text = ({ innerWidth, innerHeight, roomsData, rooms }: any) => {
	return (
		<>
			<text
				fill="rgba(255, 255, 255, 1)"
				textAnchor="middle"
				alignmentBaseline="after-edge"
				transform={`translate(
					${innerWidth/2}, 
					${innerHeight/2}
				)`}
			>
				{`${rooms} dorm`}
			</text>
			<text
				fill="rgba(255, 255, 255, 1)"
				textAnchor="middle"
				alignmentBaseline="before-edge"
				fontSize="0.8em"
				transform={`translate(
					${innerWidth/2}, 
					${innerHeight/1.9}
				)`}
			>
				{`${Math.round(roomsData[rooms])} %`}
			</text>
		</>
	)
}

Text.displayName="Text";