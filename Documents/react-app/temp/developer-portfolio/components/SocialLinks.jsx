import { Icon } from "@iconify/react";
import React from "react";

import { Button } from "reactstrap";

import { socialLinks } from "../portfolio";

const SocialLinks = () => {
	return (
		<div className="btn-wrapper text-lg">
			{socialLinks.url && (
				<Button
					className="btn-icon-only rounded-circle ml-1"
					color="white"
					rel="noopener"
					aria-label="URL"
					href={socialLinks.url}
					target="_blank"
				>
					<span className="btn-inner--icon">
						<i className="fa fa-link" />
					</span>
				</Button>
			)}
			{socialLinks.linkedin && (
				<Button
					className="btn-icon-only rounded-circle ml-1"
					color="twitter"
					rel="noopener"
					aria-label="Linkedin"
					href={socialLinks.linkedin}
					target="_blank"
				>
					<span className="btn-inner--icon">
						<i className="fa fa-linkedin" />
					</span>
				</Button>
			)}
			{socialLinks.github && (
				<Button
					className="btn-icon-only rounded-circle ml-1"
					color="github"
					href={socialLinks.github}
					rel="noopener"
					aria-label="Github"
					target="_blank"
				>
					<span className="btn-inner--icon">
						<i className="fa fa-github" />
					</span>
				</Button>
			)}
			{socialLinks.instagram && (
				<Button
					className="btn-icon-only rounded-circle ml-1"
					color="instagram"
					href={socialLinks.instagram}
					target="_blank"
					rel="noopener"
					aria-label="Instagram"
				>
					<span className="btn-inner--icon">
						<i className="fa fa-instagram" />
					</span>
				</Button>
			)}
			{socialLinks.facebook && (
				<Button
					className="btn-icon-only rounded-circle ml-1"
					color="facebook"
					href={socialLinks.facebook}
					target="_blank"
					rel="noopener"
					aria-label="Facebook"
				>
					<span className="btn-inner--icon">
						<i className="fa fa-facebook-square" />
					</span>
				</Button>
			)}
			{socialLinks.twitter && (
				<Button
					className="btn-icon-only rounded-circle"
					color="twitter"
					href={socialLinks.twitter}
					target="_blank"
					rel="noopener"
					aria-label="Twitter"
				>
					<span className="btn-inner--icon">
						<i className="fa fa-twitter" />
					</span>
				</Button>
			)}
			{socialLinks.whatsapp && (
				// <Icon icon="logos:whatsapp-icon"
				// fontSize={30}
				// style={{
				// 	margin:"4px"
				// }}
				// >

				// </Icon>
				<Button
					className="btn-icon-only rounded-circle"
					style={{
						backgroundColor: "#25d366",
						border: "0px",
						// display:'flex'
					}}
					// color="#128c7e"
					href={socialLinks.whatsapp}
					target="_blank"
					rel="noopener"
					aria-label="Whatsapp"
				>

					<span className="btn-inner--icon">
						<i className="fa fa-whatsapp" aria-hidden="true"
							style={{
								color:"white",
								fontSize: "20px",
								marginTop: '8px'
							}}
						/>
					</span>
				</Button>
			)}
		</div>
	);
};

export default SocialLinks;
