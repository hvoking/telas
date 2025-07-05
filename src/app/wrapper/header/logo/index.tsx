// App imports
import './styles.scss';

export const LogoGenerativa = () => {
	return (
		<img 
			className="logo-wrapper"
			src={process.env.PUBLIC_URL + "/static/logos/logo.svg" }
			alt="logo"
		/>
	)
}

LogoGenerativa.displayName="LogoGenerativa";