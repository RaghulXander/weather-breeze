module.exports = {
	"*.css": "stylelint --fix",
	"*.scss": "stylelint --fix",

	// Just running prettier here. ESlint against all changed typescript files takes a long time.
	// The build server will be responsible for catching any ESlint errors.
	"*.{json,js,tsx,ts,yml,html}": "prettier --write"
};
