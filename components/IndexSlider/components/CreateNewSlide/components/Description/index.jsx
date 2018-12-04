import React from "react";
import { TextArea, Popup } from "semantic-ui-react";
import { SLIDE_DESCRIPTION } from "@consts/slide";
import { CreateNewSlideContext } from "../../context";

const Description = () => (
	<CreateNewSlideContext.Consumer>
		{ctx => {
			const error = ctx.getTypeError(SLIDE_DESCRIPTION);

			return (
				<Popup
					open={!!error}
					trigger={
						<TextArea
							fluid
							autoHeight
							rows={2}
							error={!!error}
							placeholder="Введите подзаголовок для слайда"
							value={ctx.temporarySlide[SLIDE_DESCRIPTION]}
							onChange={(_, { value }) =>
								ctx.handleTemporarySlide({
									[SLIDE_DESCRIPTION]: value
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

export default Description;
