import emoji from "react-easy-emoji";

export const greetings = {
	name: "Intellitechlab",
	title: "Software company & more",
	description:
		`We do websites, web applications, mobile apps
We're the best you can find in Romania`,
	resumeLink:
		"https://drive.google.com/file/d/1VTp-IMZ58AS3ZPBo3sH5fr6D4crz1LGj/view?usp=sharing",
}

export const openSource = {
	githubUserName: "MhdGmal1998",
}

export const contact = {};

export const socialLinks = {
	url: "http://mohammedalhomaidi.metawees.com/",
	linkedin: "https://www.linkedin.com/in/metawees/",
	github: "https://github.com/MhdGmal1998",
	instagram: "https://www.instagram.com/q_4dd",
	facebook: "https://www.facebook.com/metawees1",
	twitter: "https://twitter.com/metawees1",
	whatsapp: "https://wa.me/00967771511569"
};

export const OurSkills = {
	title: 'We Offer Many IT Services Including',
	data: [
		{
			title: 'Mobile',
			description: 'Android and IOS Applications that are smooth, stylish, and user-friendly.',
		},
		{
			title: 'Web',
			description: 'Websites and Web Applications that are responsive, elegant, and compatible with modern browsers.',
		},
		{
			title: 'Networks',
			description: 'Network Services and Solutions that are reliable, efficient, and highly secure.',
		}
	]
}
export const Offer = {
	title: 'Our Solutions Take Care Of All Your Needs',
	subTitle: 'We got your business covered from start to end',
	data: [
		{
			lottieAnimationFile: "/lottie/skills/fullstack.json",
			title: '[1] Different Platforms',
			description: 'We can implement your solution in any platform including mobile apps, websites and desktop applications'
		},
		{
			lottieAnimationFile: "/lottie/skills/cloudinfra.json",
			title: '[2] Hosting Management',
			description: 'We offer hosting for your website which includes unlimited email creation for your business, storage and security with our support.'
		},
		{
			lottieAnimationFile: "/lottie/network.json",
			title: '[3] Many Integrations',
			description: 'We provide a range of other services to complement your business needs and infrastructure including software, design, networking, and digital marketing.'
		}
	]
}
export const skillsSection = {
	title: "What We do",
	subTitle:
		"Give you creative idea to grow your bussiness",
	data: [
		{
			title: "Full Stack Development",
			lottieAnimationFile: "/lottie/skills/fullstack.json", // Path of Lottie Animation JSON File
			skills: [
				emoji(
					"⚡ Building responsive Single-Page-Apps (SPA) & PWA in React.js"
				),
				emoji("⚡ Building responsive static websites using Next.js"),
				emoji(
					"⚡ Building RESTful APIs in NodeJS "
				),
			],
			softwareSkills: [
				{
					skillName: "HTML-5",
					fontAwesomeClassname: "vscode-icons:file-type-html",
				},
				{
					skillName: "CSS-3",
					fontAwesomeClassname: "vscode-icons:file-type-css",
				},
				{
					skillName: "JavaScript",
					fontAwesomeClassname: "logos:javascript",
				},
				{
					skillName: "Reactjs",
					fontAwesomeClassname: "vscode-icons:file-type-reactjs",
				},
				{
					skillName: "ReactNative",
					fontAwesomeClassname: "tabler:brand-react-native",
				},
				{
					skillName: "Nextjs",
					fontAwesomeClassname: "vscode-icons:file-type-light-next",
				},
				// {
				// 	skillName: "Python",
				// 	fontAwesomeClassname: "logos:python",
				// },
				// {
				// 	skillName: "Django",
				// 	fontAwesomeClassname: "vscode-icons:file-type-django",
				// },

				{
					skillName: "Redux",
					fontAwesomeClassname: "logos:redux",
				},
				{
					skillName: "NPM",
					fontAwesomeClassname: "logos:npm-icon",
				},
				{
					skillName: "Yarn",
					fontAwesomeClassname: "logos:yarn",
				},
				{
					skillName: "asp",
					fontAwesomeClassname: "vscode-icons:file-type-asp"
				},
				{
					skillName: "Java",
					fontAwesomeClassname: "bxl:java"
				}
			],
		},
		{
			title: "Cloud Infra-Architecture",
			lottieAnimationFile: "/lottie/skills/cloudinfra.json", // Path of Lottie Animation JSON File
			skills: [
				emoji("⚡ Experience of working on multiple cloud platforms"),
				emoji(
					"⚡ Hosting and maintaining websites on virtual machine instances along with integration of databases"
				),
				emoji(
					"⚡ Building CI/CD pipelines for automated testing & deployment using Github Actions"
				),
			],
			softwareSkills: [
				// ? Check README To get icon details
				{
					skillName: "AWS",
					fontAwesomeClassname: "logos:aws",
				},
				{
					skillName: "Azure",
					fontAwesomeClassname: "logos:microsoft-azure",
				},
				{
					skillName: "Firebase",
					fontAwesomeClassname: "logos:firebase"
				},
				{
					skillName: "MongoDB",
					fontAwesomeClassname: "logos:mongodb-icon"
				},
				// {
				// 	skillName: "Heroku",
				// 	fontAwesomeClassname: "logos:heroku-icon",
				// },
				{
					skillName: "PostgreSQL",
					fontAwesomeClassname: "logos:postgresql",
				},
				{
					skillName: "Github",
					fontAwesomeClassname: "akar-icons:github-fill",
				},
				// {
				// 	skillName: "Docker",
				// 	fontAwesomeClassname: "logos:docker-icon",
				// },
				// {
				// 	skillName: "Github Actions",
				// 	fontAwesomeClassname: "logos:github-actions",
				// },
				// {
				// 	skillName: "Cloudinary",
				// 	fontAwesomeClassname: "logos:cloudinary",
				// },
				// {
				// 	skillName: "Nginx",
				// 	fontAwesomeClassname: "logos:nginx",
				// },
				// {
				// 	skillName: "Sentry",
				// 	fontAwesomeClassname: "logos:sentry-icon",
				// },
			],
		},
		{
			title: "Analyst and Tester System",
			lottieAnimationFile: "/lottie/skills/ethereum.json", // Path of Lottie Animation JSON File
			skills: [
				emoji(
					"⚡ Experience in developing Systems with Agile methodology"
				),
				emoji(
					"⚡ Building Scripts for testing in ReactJS and React Native "
				),
				// emoji(
				// 	"⚡ Experience of using Openzeppelin Smart Contract Standards & Chainlink Oracles"
				// ),
				// emoji(
				// 	"⚡ Developing NFT Smart Contracts using ERC-721 Token Standard"
				// ),
				// emoji(
				// 	"⚡ Building Dapps with React.js & Solidity using Web3.js, Moralis & IPFS"
				// ),
			],
			softwareSkills: [
				{
					skillName: "jset library",
					fontAwesomeClassname: "logos:jest"
				},
				{
					skillName: "drawio",
					fontAwesomeClassname: "vscode-icons:file-type-drawio",
				},
				{
					skillName: "Enzyme",
					fontAwesomeClassname: "healthicons:enzyme",
				},
				{
					skillName: "Jira Software",
					fontAwesomeClassname: "logos:jira",
				},
				{
					skillName: "Trello",
					fontAwesomeClassname: "logos:trello",
				},
			],
		},
	],
};

export const SkillBars = [
	{
		Stack: "Frontend/Design", //Insert stack or technology you have experience in
		progressPercentage: "90", //Insert relative proficiency in percentage
	},
	{
		Stack: "Backend",
		progressPercentage: "70",
	},
	{
		Stack: "Programming",
		progressPercentage: "85",
	},
];

export const educationInfo = [
	{
		schoolName: "IBB University",
		subHeader: "Backloria of Computer Science and Information Technology",
		duration: "September 2017 - Septemner 2022",
		desc: "Designed Control Panel for Blood Bank Application, also The Backend in nodeJS ",
		grade: "Grade A",
		// descBullets: [
		// 	"Lorem ipsum dolor sit amet, consectetur adipdfgiscing elit",
		// 	"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
		// ],
	},
];

export const experience = [
	{
		role: "Frontend Developer",
		company: "Intellitech IT Smart Consulting",
		companylogo: "/img/icons/common/Intellitech.png",
		date: "September 2022 ",
		desc: "I'm working as  frontend web developer to design web based admin dashboards for mulitple apps using React.JS, MUI, Node.js and some other libraries.",
		linkedin: "https://www.linkedin.com/company/intellitech-it-smart-consulting/about/"
	},
	{
		role: "API Engineer",
		company: "Noor",
		companylogo: "/img/icons/common/noor.jpg",
		date: "Septem 2022",
		desc: "I'm still working as API Engineer on noor application company. Noor is E-Commerce Application works based on Coupon, It's Still under Development",
		// descBullets: [
		// 	"Lorem ipsum dolor sit amet, consdfgectetur adipiscing elit",
		// 	"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
		// ],
	},
	{
		role: "Full Stack Developer",
		company: "Freelancer",
		companylogo: "/img/icons/common/teachme.jpg",
		date: " 2021 Dec - 2202 Apr",
		desc: "Worked as MERN web developer to create a E-Learn website ",
	},
	// {
	// 	role: "Backend Developer",
	// 	company: "Wapidu",
	// 	companylogo: "/img/icons/common/wapidu.jpg",
	// 	date: "Sept 2021",
	// 	desc: "Worked as a Django Developer to integrate Stripe payment gateway in wapidu.com and Created REST APIs using Django REST Framework to integrate Django Stripe backend to Vue.js Frontend and Deployed it on Azure based Docker container registry.",
	// },
];

export const projects = [
	{
		name: "Modern Portfolio Template",
		desc: "Software Developer Portfolio Template built with react.js, next.js and bootstrap that helps you showcase your work and skills as a software developer.",
		github: "https://github.com/MhdGmal1998/portfolios",
		link: "https://mohammedalhomaidi.vercel.app/",
	},
	// {
	// 	name: "AtlasMart",
	// 	desc: "With Atlas Mart, it’s easy to find the products with the best price and ship them straight to your door.",
	// 	github: "https://github.com/1hanzla100/Django-React-Marketplace",
	// },
	// {
	// 	name: "Technota (Forum)",
	// 	desc: "Get hands-on experience in technical skills with Technota",
	// 	github: "https://github.com/1hanzla100/django-react-forum",
	// },
	{
		name: "E-Blind",
		desc: "ReactJS Wibsite to help Blinds to identifys the contents of website through voice",
		github: "https://github.com/MhdGmal1998/e-blind.git",
		// link: "https://e-blind-mhdgmal1998.vercel.app/"
	},
	{
		name: "Dashboard Material UI",
		desc: "Get hands-on experiance in Material Design concepts",
		github: "https://github.com/MhdGmal1998/meta-dash.git",
		// link: "https://meta-dash-mhdgmal1998.vercel.app/"
	},
	{
		name: "Educational Application in RN",
		desc: "Get ready to pass Exam in Yemen University",
		googlePaly: "https://play.google.com/store/apps/details?id=com.metalearn"
	}
];

export const feedbacks = [
	// {
	// 	name: "John Smith",
	// 	feedback:
	// 		"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, vel illo. Eum magnam beatae ratione eos natus accusamus unde pariatur fugiat at facilis, modi molestiae? Labore odio sit eligendi. Tenetur.",
	// },
	// {
	// 	name: "John Smith",
	// 	feedback:
	// 		"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, vel illo. Eum magnam beatae ratione eos natus accusamus unde pariatur fugiat at facilis, modi molestiae? Labore odio sit eligendi. Tenetur.",
	// },
];

// See object prototype on SEO.jsx page
export const seoData = {
	title: "Mohammed Gamal Alhomaidi",
	description:
		"I'm passionate Full Stack web developer having an experience of web applications with NodeJS, Laravel, React.js, Next.js and Mobile Application developer with React Native and Flutter",
	author: "Mohammed Alhomaidi",
	image: "https://avatars.githubusercontent.com/u/90135545?v=4",
	url: "https://github.com/MhdGmal1998/",
	keywords: [
		"Mohammed",
		"Mohammed Alhomaidi",
		"محمد جمال الحميدي",
		"@MhdGmal1998",
		"MhdGmal1998",
		"Portfolio",
		"Mohammed Portfolio ",
		"Mohammed Alhomaidi Portfolio",
	],
}