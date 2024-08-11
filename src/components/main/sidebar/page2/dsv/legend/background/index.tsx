export const Background = ({
	item,
	currentPercent,
	innerWidth,
	totalHeight,
	currentHeight,
	currentGap,
	currentDifference,
	currentType,
	onClick,
}: any) => {
	return (
		<g>
			<rect
				key={item}
				x={innerWidth * currentPercent / 100}
				y={totalHeight - currentHeight + currentGap}
				width={innerWidth - innerWidth * currentPercent / 100}
				height={currentHeight - currentDifference}
				stroke={"rgba(155, 155, 155, 1)"}
				strokeWidth={currentType === item ? "1" : "0"}
				fill={"rgba(155, 155, 155, 0.6)"}
				onClick={() => onClick(item)}
				style={{cursor: "pointer"}}
			/> 
		</g>
	)
}

Background.displayName="Background";