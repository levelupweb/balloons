export const recomputeSvg = (svg, color) => {
	svg.setAttribute("width", "100%");
	svg.setAttribute("height", "100%");
	svg.setAttribute("viewBox", "0 0 100 100");
	svg.getElementsByTagName("path")[0].style.fill = color || "#fff";
};
