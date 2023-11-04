import {CardActionArea} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Link} from "react-router-dom";

export default function ContestCard(props) {

  console.log("ContestCard", props);

  return <CardActionArea component={Link} to={`/vote/${props.contest.id}`}>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.contest.name}
        </Typography>
        <Typography variant="body2">
          {props.contest.description}
        </Typography>
      </CardContent>
    </Card>
  </CardActionArea>;
}
