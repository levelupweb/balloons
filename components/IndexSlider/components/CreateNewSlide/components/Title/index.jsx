import React from "react";
import { Input, Popup } from "semantic-ui-react";
import { SLIDE_TITLE } from "@consts/slide";
import { CreateNewSlideContext } from "../../context";

const Title = () => (
	<CreateNewSlideContext.Consumer>
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
	</CreateNewSlideContext.Consumer>
);

export default Title;
