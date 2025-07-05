const areasArray: any = Array.from({length: 27}, (_, i) => (i + 3)*10);

export const AreaSlider = ({ xScale, yScale, data, innerWidth, innerHeight }: any) => {
    const rgbaData = data && data.areas_color;
    const percentageData = data && data.areas_percentage

    if (!percentageData || !rgbaData) return <>Loading...</>

	return (
        <>
            {
                areasArray.map((item: any, index: number) => {
                    return (
                        <rect
                            key={index}
                            x={xScale(item) + 1}
                            y={
                                percentageData[item] ?
                                innerHeight - yScale(percentageData[item]) - 20 :
                                innerHeight - 15
                            }
                            width={innerWidth/(areasArray.length - 1) - 2}
                            height={
                                percentageData[item] ?
                                yScale(percentageData[item]) + 20 :
                                15
                            }
                            style={{
                                fill: rgbaData[item] ?
                                rgbaData[item] :
                                rgbaData["null"]
                            }}
                        />
                    )
                })
            }
        </>
	)
}

AreaSlider.displayName="AreaSlider"