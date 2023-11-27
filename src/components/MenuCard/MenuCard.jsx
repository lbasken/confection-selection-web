import "./MenuCard.css";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea} from "@mui/material";
import {Link} from "react-router-dom";

export default function MenuCard(props) {

  return <div>
  <Card className="menu-card" sx={{ minWidth: 275 }}>
    <CardActionArea component={Link} to={props.route}>
    <CardContent>
      <Typography className="card-title" variant="body2">
        {props.title}
      </Typography>
      <Typography className="card-body" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.body}
      </Typography>
    </CardContent>
    </CardActionArea>
  </Card>
  </div>
}
