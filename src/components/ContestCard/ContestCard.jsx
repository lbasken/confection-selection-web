import "./ContestCard.css";
import * as React from "react";
import {Link} from "react-router-dom";
import {CardActionArea} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function ContestCard(props) {

  function renderCard() {
    return <Card className="contest-card" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography className="contest-name" variant="h5" component="div">
          {props.contest.name}
        </Typography>
        <Typography className="contest-description" variant="body2">
          {props.contest.description}
        </Typography>
      </CardContent>
    </Card>;
  }

  if (props.clickable) {
    return <CardActionArea className="clickable-contest-card" component={Link} to={`/vote/${props.contest.id}`}>
      {renderCard()}
    </CardActionArea>;
  }

  return renderCard();
}
