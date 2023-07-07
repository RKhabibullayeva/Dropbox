import React from "react";
import classes from "./Round.module.scss";
import innerImg from '../images/91.png'
import innerImg2 from "../images/90.png";
import innerImg3 from "../images/87.png";
import innerImg4 from "../images/76.png";

import innerImg5 from "../images/88.png";
import innerImg6 from "../images/89.png";
import innerImg7 from "../images/912.png";
import innerImg8 from "../images/92.png";
import innerImg9 from "../images/93.png";
import innerImg10 from "../images/94.png";

function Round() {
	return (

		<div className={classes.outerBox}>	
			<div className={classes.roundBack}></div>
			<div className={classes.roundOne}>
				<div className={classes.roundTwoBox}>
					<div className={classes.firstLayer}>
						<img alt="round shape" className={classes.roundTwo} src={innerImg}></img>
						<img className={classes.roundThree} alt="round shape" src={innerImg2}></img>
					</div>
				</div>
				<div className={classes.roundThreeBox}>
					<div className={classes.secondLayer}>
						<img className={classes.round87} alt="round shape" src={innerImg3}></img>
						<img className={classes.round88} alt="round shape" src={innerImg5}></img>
						<img className={classes.round79} alt="round shape" src={innerImg4}></img>
						<img className={classes.round89} alt="round shape" src={innerImg6}></img>
					</div>
				</div>
				<div className={classes.roundFourBox}>
					<div className={classes.thirdLayer}>
						<img className={classes.round91} alt="round shape" src={innerImg7}></img>
						<img className={classes.round92} alt="round shape" src={innerImg8}></img>
						<img className={classes.round93} alt="round shape" src={innerImg9}></img>
						<img className={classes.round892} alt="round shape" src={innerImg10}></img>
					</div>
				</div>
			</div>
		</div>

	);
}

export default Round;