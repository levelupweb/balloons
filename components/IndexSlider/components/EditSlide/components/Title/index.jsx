import React from "react";
import { Input, Popup } from "semantic-ui-react";
import { SLIDE_TITLE } from "@consts/slide";
import { EditSlideContext } from "../../context";

const Title = () => (
	<EditSlideContext.Consumer>
		{ctx => {
			const error = ctx.getTypeError(SLIDE_TITLE);

			return (
				<Popup
					open={!!error}
					trigger={
						<Input
							fluid
							error={!!error}
							placeholder="Введите заголовок для слайда"
							value={ctx.temporarySlide[SLIDE_TITLE]}
							onChange={(_, { value }) =>
								ctx.handleTemporarySlide({
									[SLIDE_TITLE]: value
								})
							}
						/>
					}
				>
					{error}
				</Popup>
			);
		}}
	</EditSlideContext.Consumer>
);

export default Title;
