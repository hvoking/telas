export const Suggestions = ({ suggestions, onClick }: any) => {
	return (
		<ul className="suggestions">
			{
				suggestions.map((suggestion: any, index: number) => {
					return (
						<li key={index} onClick={onClick}>
							{suggestion}
						</li>
					)
				})
			}
		</ul>
	)
};

Suggestions.displayName="Suggestions";