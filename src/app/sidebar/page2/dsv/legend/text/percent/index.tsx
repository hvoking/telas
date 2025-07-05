export const PercentText = ({
	item,
	innerWidth,
	totalHeight,
	currentHeight,
	currentType,
	onClick,
	currentPercent,
}: any) => {
	return (
		<g>
			<text
				key={item}
				x={innerWidth + 40}
				y={totalHeight - currentHeight + currentHeight/2}
				fill={currentType === item ? "rgba(255, 255, 255, 1)" : "rgba(126, 126, 132, 1)"}
				textAnchor="end"
				alignmentBaseline="middle"
				fontSize="0.8em"
				fontWeight="500"
				onClick={() => onClick(item)}
				style={{cursor: "pointer"}}
			>
				{Math.round(currentPercent)}%
			</text>
		</g>
	)
}

PercentText.displayName="PercentText";